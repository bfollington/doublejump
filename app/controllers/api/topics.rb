Doublejump::App.controllers "/api", :cache => false do

  layout :none
  set :allow_disabled_csrf, true
  set :protect_from_csrf, false

  get :topics do

    topics = Topic.all

    send_json({:topics => topics})
  end

  post :topics do
    data = get_body

    topic = Topic.new(name: data["name"])
    topic.save!

    content_type :json
    topic.to_json
  end

  get :modules do
    modules = LearningModule.all

    send_json({modules: modules})
  end

end
