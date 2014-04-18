LearnToGameDev::App.controllers :steps do
  
  layout :app

  get :index do
    @steps = Step.all
    render 'steps/index'
  end
  
  get :make do
    render 'steps/new'
  end

  post :make do

    @step = Step.create( :title => params[:step][:title], :body => params[:step][:body], :slug => params[:step][:slug] )

    if @step.valid?
      @step.save
      render 'steps/new_success'
    else
      render 'steps/new'
    end

  end

  get :make, :with => :slug do

    @step = Step.where( :slug => params[:slug] ).first

    render 'steps/new'
  end

  post :make, :with => :slug do

    @step = Step.where( :slug => params[:slug] ).first

    @step.title = params[:step][:title]
    @step.slug = params[:step][:slug]
    @step.body = params[:step][:body]

    if @step.valid?
      @step.save
      render 'steps/new_success'
    else
      render 'steps/new'
    end

  end

end
