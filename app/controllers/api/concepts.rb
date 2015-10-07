Doublejump::App.controllers "/api", :cache => false do

  layout :none
  set :allow_disabled_csrf, true
  set :protect_from_csrf, false

  get :concept, :with => :id do
    learning_module = LearningModule.find(params[:id])

    send_json learning_module.to_hash
  end

  post :add_comment, :with => :content_id do

    data = get_body

    content = Content.find(params[:content_id])
    content.comments.create!(text: data["text"], account: current_account)
    content.save!

    send_json({success: true})

  end

  post :concept do
    data = get_body

    if data["id"].nil?
      learning_module = LearningModule.new
    else
      learning_module = LearningModule.find(data["id"])
    end

    learning_module.from_hash(data)

    send_json learning_module.to_hash
  end

  get :concepts do
    learning_modules = LearningModule.all

    send_json learning_modules.map{ |learning_module| learning_module.to_hash }
  end

  get :contents, :with => :module_id do

    learning_module = LearningModule.find(params[:module_id])
    contents = []

    # Annotate types for loading
    learning_module.content_ids.each do |content_id|
      content = Content.find(content_id).to_hash
      contents << content
    end

    send_json contents
  end


end
