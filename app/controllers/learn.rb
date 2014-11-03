require "rest_client"

Doublejump::App.controllers :learn, :cache => true do

  layout :learn

  get :index do
    expires_in 30

    @courses = Course.all
    @categories = Category.all

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

    current_account.update_progress(@course, @lesson, @lesson.get_last_step)

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
    elsif !can_see_learn_content?
        session[:flash] = "Your account is currently paused, please unpause to view any content."
        redirect url_for(:users, :account_settings)
    end

    fetch_course(params[:course])
    fetch_lesson(params[:lesson])
    fetch_step(params[:step])

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
    current_account.update_progress(@course, @lesson, prev_step)
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
