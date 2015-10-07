Doublejump::App.controllers "/api", :cache => false do

  layout :none
  set :allow_disabled_csrf, true
  set :protect_from_csrf, false


  get :project, :with => :slug do
    project = Project.where(slug: params[:slug]).first

    send_json({ project: attach_completed_modules(attach_metadata(project)) })
  end

  get :projects do

    projects = []

    current_account.projects.each do |project|
      projects << attach_completed_modules(attach_metadata(project))
    end

    send_json({ projects: projects })
  end

  post :project do
    # New Project

    data = get_body
    project = Project.new({title: data["title"], slug: data["slug"]})

    current_account.projects << project
    project.save!

    data["likedTopics"].each do |topic|
        topic_score = TopicScore.find_or_initialize_by(project: project, topic: topic)
        topic_score.score = topic_score.score || 0
        topic_score.score = topic_score.score + 5
    end

    data["comfortableTopics"].each do |topic|
      topic_score = TopicScore.find_or_initialize_by(project: project, topic: topic)
      topic_score.score = topic_score.score || 0
      topic_score.score = topic_score.score + 5
    end

    current_account.current_project = project
    current_account.save!

    send_json({success: true, project: project})
  end

  post :project, :with => :id do
    # Update Project
  end


end
