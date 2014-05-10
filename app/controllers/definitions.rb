LearnToGameDev::App.controllers :definitions do
  
  layout :app

  get :index do

    @definitions = Definition.all

    render 'definitions/index', :layout => :learn
  end

  get :make do
    @lessons = Lesson.all
    @courses = Definition.all
    render 'definitions/new'
  end

  get :make, :with => :id do
    @definition = Definition.find(params[:id])
    render 'definitions/new'
  end

  get :define, :with => :query do
    @definition = Definition.where(:search_title => params[:query]).first

    content_type :json
    @definition.to_json
  end

  get :view, :with => :query do
    @definition = Definition.where(:search_title => params[:query]).first

    render 'definitions/view', :layout => :learn
  end

  post :make do

    @definition = Definition.create(
      :title => params[:definition][:title],
      :body => params[:definition][:body],
      :search_title => params[:definition][:search_title]
    )

    if @definition.valid?
      @definition.save
      render 'definitions/new_success'
    else
      render 'definitions/new'
    end

  end

  post :make, :with => :id do

    @definition = Definition.find(params[:id])

    @definition.title = params[:definition][:title]
    @definition.search_title = params[:definition][:search_title]
    @definition.body = params[:definition][:body]

    if @definition.valid?
      @definition.save
      render 'definitions/new_success'
    else
      puts @definition.errors.full_messages.inspect
      render 'definitions/new'
    end

  end

end
