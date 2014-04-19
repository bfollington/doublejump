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
    @courses = Course.all
    render 'courses/index'
  end

  get :make do
    @lessons = Lesson.all
    render 'courses/new'
  end

  get :make, :with => :slug do
    @lessons = Lesson.all
    @course = Course.where(:slug => params[:slug]).first
    render 'courses/new'
  end

  post :make, :with => :slug do
    @course = Course.where(:slug => params[:slug]).first

    @course.title = params[:course][:title]
    @course.description = params[:course][:description]
    @course.account = current_account
    @course.slug = params[:course][:slug]
    @course.lessons = []

    puts @params[:course][:lessons]

    if @course.valid? && params[:course][:lessons].length > 0

      params[:course][:lessons].each do |lesson_id|
        @course.lessons.push( Lesson.find(lesson_id) )
      end

      @course.save
      render 'courses/new_success'
    else
      render 'courses/edit'
    end
  end

  post :make do

    @course = Course.create( :title => params[:course][:title],
                             :description => params[:course][:description],
                             :slug => params[:course][:slug],
                             :account => current_account
                            )

    if @course.valid? && params[:course][:lessons].length > 0

      params[:course][:lessons].each do |lesson_id|
        @course.lessons.push( Lesson.find(lesson_id) )
      end

      @course.save
      render 'courses/new_success'
    else
      render 'courses/new'
    end

  end

  get :view do

  end

end
