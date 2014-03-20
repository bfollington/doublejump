LearnToGameDev::App.controllers :learn do
  
  get :index do
    return "Yo"
  end

  get :view_course, :map => '/learn/:course/' do
    return params[:course]
  end

  get :view_lesson, :map => '/learn/:course/:lesson/' do
    return params[:course] + " " + params[:lesson]
  end

  get :view_step, :map => '/learn/:course/:lesson/:step' do
    return params[:course] + " " + params[:lesson] + " " + params[:step]
  end

end
