Doublejump::App.controllers :steps do

  layout :app

  get :index do
    @steps = Step.all
    render 'steps/index'
  end

  get :make do
    render 'steps/new'
  end

  post :make do

    @step = Step.create(params[:step])

    params[:contents].each do |content|
        @step.contents << Content.where(id: content)
    end

    if @step.valid?
      @step.save
      session[:flash] = "Step saved successfully!"
      render 'steps/new'
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

    @step.contents = []
    params[:contents].each do |content|
        @step.contents << Content.where(id: content)
    end

    @step.update_attributes(params[:step])

    if @step.valid?
      @step.save
      session[:flash] = "Step saved successfully!"
      render 'steps/new'
    else
      puts @step.errors.full_messages.inspect
      render 'steps/new'
    end

  end

end
