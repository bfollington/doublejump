Doublejump::App.controllers "/api", :cache => false do

  layout :none
  set :allow_disabled_csrf, true
  set :protect_from_csrf, false

  get :graph, :with => [:module, :project] do

      # Calculate relevance score of all other modules
          # Based on existing topic scores
          # Biased by the module that was just finished (bonus to its topic scores?)
          # Take into account meta feedback, like other user's paths

      last_module = LearningModule.find(params[:module])
      project = Project.where(slug: params[:project]).first

      puts params.inspect

      content_type :json
      build_graph(project, last_module).to_json

  end

  get :full_graph, :with => [:project] do

      # Calculate relevance score of all other modules
          # Based on existing topic scores
          # Biased by the module that was just finished (bonus to its topic scores?)
          # Take into account meta feedback, like other user's paths

      project = Project.where(slug: params[:project]).first

      content_type :json
      build_full_graph(project).to_json

  end

end
