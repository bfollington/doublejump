require "rest_client"

LearnToGameDev::App.controllers :learn, :cache => true do
  
  layout :learn
  
  get :index do
    expires_in 30

    @courses = Course.all

    render 'learn/index'
  end






  #
  # COURSES
  #

  get :view_course, :map => '/learn/:course/' do
    
    fetch_course(params[:course])

    puts @course.inspect

    render 'learn/course'
  end






  #
  # LESSONS
  #

  get :view_lesson, :map => '/learn/:course/:lesson/' do

    fetch_course(params[:course])
    fetch_lesson(params[:lesson])

    if @course.nil? || @lesson.nil?
      halt 404
    end

    render 'learn/lesson'
  end







  #
  # STEPS
  #

  get :finish_lesson, :map => '/learn/:course/:lesson/finish' do
    
    fetch_course(params[:course])
    fetch_lesson(params[:lesson])

    current_account.complete_step @lesson.get_last_step unless current_account.nil?
    current_account.complete_lesson @lesson unless current_account.nil?

    if @lesson == @course.get_last_lesson
      current_account.complete_course @course unless current_account.nil?
      @completing_course = true
    end

    render 'learn/finish_lesson'
  end

  get :view_step, :map => '/learn/:course/:lesson/:step' do

    if !is_logged_in
      redirect '/login'
    end

    fetch_course(params[:course])
    fetch_lesson(params[:lesson])
    fetch_step(params[:step])

    @body_edited = insert_comment_tags @step.body
    @body_edited = expand_macros @body_edited
    @body_edited = RDiscount.new(@body_edited, :no_superscript).to_html
    @body_edited = lazy_load_images @body_edited

    mark_prev_step_as_complete

    if @step.is_sharing_step
      @sharing_steps = SharedImage.where(step: @step).order_by(:created_at.desc)
    end

    render 'learn/step'

  end









  post :share_image, :map => '/learn/share-image/:step' do
    
    fetch_step(params[:step])

    shared_image = SharedImage.new(
      :url => params[:shared_image][:url],
      :description => params[:shared_image][:description],
      :step => @step,
      :account => current_account
    )

    errors = {}

    if shared_image.valid?

      begin
        res = RestClient::Request.execute(:method => :head, :url => params[:shared_image][:url], :timeout => 10, :open_timeout => 10)

        puts res.net_http_res.header['content-type']
        valid_image = ( res.net_http_res.header['content-type'].start_with?("image/") )
      rescue
        valid_image = false
      end



      if !valid_image
        errors = {:url => "This URL does not point to a valid image."}
      end

    end
    

    content_type :json

    if shared_image.valid? && valid_image

      shared_image.save

      {:refresh => true, :success => true}.to_json
    else

      {:success => false, :errors => errors.merge(shared_image.errors.messages)}.to_json
    end

    
    
  end

end

#
# Marks the step the user just viewed as complete, called when viewing a step
#
def mark_prev_step_as_complete
  prev_step = @lesson.get_prev_step @step

  if prev_step && current_account
    current_account.complete_step prev_step
  end
end

#
# Marks up the body of the step with comment tags, replace _#num_ by a comment icon.
#
def insert_comment_tags(body)
  body.scan(Step.id_regex).each do |tag|
    html_tag = "<span class='comment' data-group='#{tag[0][2..-3]}' id='comment_#{tag[0][2..-3]}'></span>"

    body = body.gsub(tag[0], html_tag)
  end

  body
end

def lazy_load_images(body)
  body.gsub("src=", "data-original=")
end

def expand_macros(body)

  edited_body = body

  body.scan(Step.macro_regex).each do |match|
    puts "match 0: " + match[0]
    edited_body.gsub!(match[0], process_macro(match))
  end

  edited_body

end

def process_macro(macro)

  name =  macro[1]
  params = macro[2].split(/\",\s*\"/)
  params[0] = params[0][1..-1]
  params[-1] = params[-1][0..-2]

  puts macro.inspect
  puts params.inspect

  if (name == "definition")
    @link_text = params[0]
    @term = params[1].downcase

    definition = Definition.where(:search_title => params[1].downcase).first
    if definition.nil?
      @invalid_term = true
    end

    render 'macros/definition', :layout => false
  elsif (name == "hideable")
    @item_text = RDiscount.new(params[1], :no_superscript).to_html
    @item_title = params[0]
    render 'macros/hideable', :layout => false
  elsif (name == "inline-definition")

    definition = Definition.where(:search_title => params[0].downcase).first

    if !definition.nil?
      @definition = RDiscount.new(definition.body, :no_superscript).to_html
      @definition_title = definition.title
      @definition_id = definition.id
      render 'macros/inline-definition', :layout => false
    else
      "Invalid Definition Term."
    end

    
  else
    macro[0]
  end
  
end

def fetch_course(slug)
  @course = Course.where(:slug => slug).first

  if @course.nil?
    halt 404
  end

  return @course
end

def fetch_lesson(slug)
  @lesson = Lesson.where(:slug => slug).first

  if @lesson.nil?
    halt 404
  end

  return @course
end

def fetch_step(slug)
  @step = Step.where(:slug => slug).first

  if @step.nil?
    halt 404
  end

  return @step
end

def fail_with_json()
  content_type :json
  {:success => false }.to_json
end

def fail_if_nil(object)
  if object.nil?
    fail_with_json
  end
end
