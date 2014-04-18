LearnToGameDev::App.controllers :learn do
  
  layout :learn
  
  get :index do
    return "Yo"
  end

  get :view_course, :map => '/learn/:course/' do
    
    fetch_course(params[:course])

    render 'learn/course'
  end

  get :view_lesson, :map => '/learn/:course/:lesson/' do

    fetch_course(params[:course])
    fetch_lesson(params[:lesson])

    if @course.nil? || @lesson.nil?
      halt 404
    end

    render 'learn/lesson'
  end

  get :finish_lesson, :map => '/learn/:course/:lesson/finish' do
    
    fetch_course(params[:course])
    fetch_lesson(params[:lesson])

    render 'learn/finish_lesson'
  end

  get :view_step, :map => '/learn/:course/:lesson/:step' do
    
    fetch_course(params[:course])
    fetch_lesson(params[:lesson])
    fetch_step(params[:step])

    if @course.nil? || @lesson.nil?
      halt 404
    end

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
