Doublejump::App.controllers "/api", :cache => false do

  layout :none
  set :allow_disabled_csrf, true
  set :protect_from_csrf, false

  post :finished_module do

    data = get_body

    learning_module = LearningModule.find(data["module"])
    project = Project.where(slug: data["project"]).first

    if project.learning_modules.include? learning_module
      content_type :json
      return {message: "Already completed this module"}.to_json
    end

    project.learning_modules << learning_module
    project.save!

    scores = []

    learning_module.topics.each do |topic|
        topic_score = TopicScore.find_or_initialize_by(project: project, topic: topic)
        topic_score.score = topic_score.score || 0
        topic_score.score = topic_score.score + 1

        scores << topic_score

        topic_score.save
    end

    content_type :json
    {scores: scores}.to_json
  end

  post :transition do
    content_type :json

    data = get_body
    from = LearningModule.find(data["current"])
    to = LearningModule.find(data["next"])

    transition = Transition.new(from: from, to: to)
    transition.save

    {transition: transition}.to_json
  end

  post :most_appropriate_topic do

    data = get_body

    relevance = TopicRelevance.new(learning_module: data["module"], topic: data["topic"], account: current_account)
    relevance.save!

    send_json({relevance: relevance})

  end

  post :module_difficulty do

    data = get_body

    difficulty = ModuleDifficulty.new(learning_module: data["module"], account: current_account, difficulty: data["difficulty"])
    difficulty.save!

    send_json({difficulty: difficulty})

  end

  get :next, :with => [:project, :module] do

    content_type :json
    next_modules(params[:project], params[:module]).to_json

  end

  get :next, :with => [:project] do

    content_type :json
    next_modules(params[:project]).to_json

  end

end
