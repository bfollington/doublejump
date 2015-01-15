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

    # remove old content type blocks that are orphaned
    old_contents = @step.contents
    to_delete = []
    old_contents.each do |content|
        if !params[:contents].include? content.id.to_s
            puts "marking " + content.id
            to_delete << content
        end
    end

    to_delete.each do |content|
        content.delete
    end

    @step.contents = []
    params[:contents].each do |id|
        @step.contents << Content.find(id)
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
