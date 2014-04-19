LearnToGameDev::App.controllers :learn do
  
  layout :learn
  
  get :index do
    return "Yo"
  end





  #
  # COMMENTS
  #

  get :get_comments, :map => '/learn/get_comments/:slug/:group' do
    @step = Step.where(slug: params[:slug]).first

    @group = params[:group]

    @comments = @step.comments.where(group: params[:group])

    content_type :json
    {:html => render('learn/comments', :layout => false), :success => true }.to_json
  end

  post :submit_comment, :map => "/learn/submit_comment/:slug/:group" do

    @step = Step.where(slug: params[:slug]).first
    comment = Comment.new(:body => params[:comment][:body], :account => current_account, :group => params[:group])

    @group = params[:group]

    if comment.valid?
      @step.comments = @step.comments || []
      @step.comments << comment

      @comments = @step.comments.where(group: params[:group])

      content_type :json
      {:html => render('learn/comments', :layout => false), :success => true }.to_json
    else
      content_type :json
      {:errors => comment.errors.messages, :success => false }.to_json
    end
  end

  get :delete_comment, :map => 'learn/delete_comment/:slug/:id' do

    if current_account.role != "admin"
      return fail_with_json
    end

    step = Step.where(slug: params[:slug]).first
    fail_if_nil step

    if step.nil?
      return fail_with_json
    end

    comment = step.comments.find( params[:id] )
    fail_if_nil comment

    comment.destroy

    content_type :json
    {:success => true }.to_json
  end

  get :report_comment, :map => 'learn/report_comment/:slug/:id' do

    step = Step.where(slug: params[:slug]).first
    fail_if_nil step

    if step.nil?
      return fail_with_json
    end

    comment = step.comments.find( params[:id] )

    fail_if_nil comment

    if !current_account.reported_comments.where(:comment => comment).first.nil?
      return fail_with_json
    end

    comment.inc(:times_reported, 1)
    reported_comment = ReportedComment.new(:comment => comment, :account => current_account)
    comment.reported_comments << reported_comment

    content_type :json
    {:success => true }.to_json
  end





  #
  # COURSES
  #

  get :view_course, :map => '/learn/:course/' do
    
    fetch_course(params[:course])

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

    render 'learn/finish_lesson'
  end

  get :view_step, :map => '/learn/:course/:lesson/:step' do
    
    fetch_course(params[:course])
    fetch_lesson(params[:lesson])
    fetch_step(params[:step])

    body = @step.body

    body.scan(Step.id_regex).each do |tag|
      puts tag.inspect

      html_tag = "\n<span class='comment' data-group='#{tag[0][1..-2]}' id='comment#{tag[0][0..-2]}'></span>"

      body = body.gsub(tag[0], html_tag)
    end

    @body_edited = body

    render 'learn/step'
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
