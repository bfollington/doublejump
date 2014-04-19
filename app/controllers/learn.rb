LearnToGameDev::App.controllers :learn do
  
  layout :learn
  
  get :index do
    return "Yo"
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
