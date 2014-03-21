LearnToGameDev::App.controllers :lessons do
    
  layout :app
  
  # get :index, :map => '/foo/bar' do
  #   session[:foo] = 'bar'
  #   render 'index'
  # end

  # get :sample, :map => '/sample/url', :provides => [:any, :js] do
  #   case content_type
  #     when :js then ...
  #     else ...
  # end

  # get :foo, :with => :id do
  #   'Maps to url '/foo/#{params[:id]}''
  # end

  # get '/example' do
  #   'Hello world!'
  # end
  # 

  get :new do
    new_lesson
  end

  post :new do

    @lesson = Lesson.create( :title => params[:lesson][:title], :description => params[:lesson][:description] )

    if @lesson.valid?
      @lesson.save
      render 'lessons/new_success'
    else
      new_lesson
    end

  end

end
