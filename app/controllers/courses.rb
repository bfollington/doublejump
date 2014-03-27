LearnToGameDev::App.controllers :courses do
  
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
  
  get :index do
    render 'index'
  end

  get :new do
    @lessons = Lesson.all
    render 'courses/new'
  end

  post :new do

    @course = Course.create( :title => params[:course][:title],
                             :description => params[:course][:description],
                             :slug => params[:course][:slug],
                            )

    params[:course][:lessons].each do |lesson_id|
      @course.lessons.push( Lesson.find(lesson_id) )
    end

    if @course.valid?
      @course.save
      render 'courses/new_success'
    else
      render 'courses/new'
    end

  end

  get :view do

  end

end
