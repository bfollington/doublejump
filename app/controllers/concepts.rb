Doublejump::App.controllers :concepts, :cache => true do

  layout :react
  set :allow_disabled_csrf, true
  set :protect_from_csrf, false

  get :index do
    render 'pages/react'
  end

  get :concept, :with => :id do
    content_type :json
    learning_module = LearningModule.find(params[:id])
    contents = []

    # Annotate types for loading
    learning_module.content_ids.each do |content_id|
      content = Content.find(content_id)
      content.write_attribute("type", content.get_type)
      contents << content
    end

    {learning_module: learning_module, contents: contents}.to_json
  end

  get :topics do

    topics = Topic.all

    send_json({:topics => topics})
  end

  get :modules do
    modules = LearningModule.all

    send_json({modules: modules})
  end


  # Projects

  get :project, :with => :slug do
    project = Project.where(slug: params[:slug]).first

    send_json({project: project})
  end

  post :project do
    # New Project

    project = Project.new({title: params[:title], slug: params[:slug]})
    project.save

    send_json({success: true, slug: project.slug})
  end

  post :project, :with => :id do
    # Update Project
  end

  get :data, :with => [:project, :key] do
    # Get Metadata from project

    project = Project.where(slug: params[:project]).first

    send_json project.metadatas.where(key: params[:key]).first
  end

  get :all_data, :with => :project do
    # Get all Metadata from project

    result = {}

    project = Project.where(slug: params[:project]).first
    project.metadatas.each do |metadata|
      result[metadata.key] = metadata.value
    end

    send_json result
  end

  post :data, :with => [:project, :key] do
    # Store Metadata within project

    project = Project.where(slug: params[:project]).first

    # Remove old value stored for this key, then store new value
    project.metadatas.where(key: params[:key]).delete
    puts project.metadatas.inspect
    metadata = Metadata.new({key: params[:key], value: params[:value]})
    metadata.save!
    project.metadatas << metadata
    puts project.metadatas.inspect

    project.save!

    send_json({success: true})
  end

  post :module_complete, :with => [:project, :module] do
    # Store Metadata within project

    project = Project.where(slug: params[:project]).first
    learning_module = LearningModule.find(params[:module])

    project.learning_modules << learning_module
    project.save!

    send_json({success: true})
  end

  delete :data, :with => [:project, :key] do
    # Remove Metadata from project
    project = Project.where(slug: params[:project]).first
    project.metadatas.where(key: params[:key]).delete

    send_json({success: true})
  end




  post :make do

    if params[:id]
      @learning_module = LearningModule.find(params[:id])
      @learning_module.update_attributes(params[:learning_module])
    else
      @learning_module = LearningModule.create(params[:learning_module])
    end

    @learning_module.contents = []

    params[:contents] = params[:contents] || []
    params[:contents].each do |content|
        @learning_module.contents << Content.find(content)
    end

    @learning_module.topics = []

    params[:topics] = params[:topics] || []
    params[:topics].each do |topic|
        @learning_module.topics << Topic.find(topic)
    end

    content_type :json

    if @learning_module.valid?
      @learning_module.save
      session[:flash] = "Concept saved successfully!"
      {:success => true, :id => @learning_module.id.to_s }.to_json
    else
      {:success => false, :errors => @learning_module.errors.messages }.to_json
    end
  end



  get :any, :map => '/concepts/*' do
    render 'pages/react'
  end

end
