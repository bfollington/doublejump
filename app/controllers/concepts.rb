Doublejump::App.controllers :concepts, :cache => true do

  layout :react

  get :index do
    render 'pages/react'
  end

  get :concept, :with => :id do
    content_type :json
    learning_module = LearningModule.find(params[:id])

    {learning_module: learning_module, contents: learning_module.contents}.to_json
  end

  get :editor do

    @learning_modules = LearningModule.all

    render 'concepts/concept_editor'
  end

  get :editor, :with => :id do

    @learning_modules = LearningModule.all
    @learning_module = LearningModule.find(params[:id])

    render 'concepts/concept_editor'
  end

  post :make do
    @learning_module = LearningModule.create(params[:learning_module])

    params[:contents].each do |content|
        @learning_module.contents << Content.find(content)
    end

    content_type :json

    if @learning_module.valid?
      @learning_module.save
      session[:flash] = "Concept saved successfully!"
      {:success => true }.to_json
    else
      {:success => false, :errors => @learning_module.errors.messages }.to_json
    end
  end

  post :make, :with => :id do
    @learning_module = LearningModule.find(params[:id])

    params[:contents].each do |content|
        @learning_module.contents << Content.find(content)
    end

    @learning_module.update_attributes(params[:learning_module])

    content_type :json

    if @learning_module.valid?
      @learning_module.save
      session[:flash] = "Concept saved successfully!"
      {:success => true }.to_json
    else
      {:success => false, :errors => @learning_module.errors.messages }.to_json
    end
  end



  get :any, :map => '/concepts/*' do
    render 'pages/react'
  end

end
