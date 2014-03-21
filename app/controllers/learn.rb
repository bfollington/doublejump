LearnToGameDev::App.controllers :learn do
  
  get :index do
    return "Yo"
  end

  get :view_course, :map => '/learn/:course/' do
    
    @course = Course.where(:slug => params[:course]).first

    render 'learn/course'
  end

  get :view_lesson, :map => '/learn/:course/:lesson/' do

    @course = Course.where(:slug => params[:course]).first
    @lesson = Lesson.where(:slug => params[:lesson]).first

    render 'learn/lesson'
  end

  get :view_step, :map => '/learn/:course/:lesson/:step' do
    
    @course = Course.where(:slug => params[:course]).first
    @lesson = Lesson.where(:slug => params[:lesson]).first
    @step = Step.where(:slug => params[:step]).first

    render 'learn/step'
  end

end
