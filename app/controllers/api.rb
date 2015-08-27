Doublejump::App.controllers :api, :cache => true do

  layout :none
  set :allow_disabled_csrf, true
  set :protect_from_csrf, false

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

  get :concepts do
    content_type :json
    learning_modules = LearningModule.all

    learning_modules.to_json
  end

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


  get :account do
      send_json({account: current_account})
  end


  # Projects

  get :project, :with => :slug do
    project = Project.where(slug: params[:slug]).first

    send_json({project: project})
  end

  post :project do
    # New Project

    data = get_body
    project = Project.new({title: data["title"], slug: data["slug"]})

    current_account.projects << project
    project.save!

    puts current_account.inspect
    puts project.inspect

    current_account.current_project = project
    current_account.save!

    send_json({success: true, project: project})
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

  delete :data, :with => [:project, :key] do
    # Remove Metadata from project
    project = Project.where(slug: params[:project]).first
    project.metadatas.where(key: params[:key]).delete

    send_json({success: true})
  end


  post :save_module do

    data = JSON.parse(params[:module])
    puts data.inspect
    puts data["learning_module"].inspect

    id = data["id"] || get_id(data["learning_module"])

    if id.nil?
        learning_module = LearningModule.new
    else
        learning_module = LearningModule.find(id)
    end

    learning_module.update_attributes(
      title: data["learning_module"]["title"],
      slug: data["learning_module"]["slug"],
      url: data["learning_module"]["url"]
    )

    if learning_module.url.nil?
        learning_module.external = false
    else
        learning_module.external = !learning_module.url.empty
    end


    learning_module.topics = []

    data["topics"] = data["topics"] || []
    data["topics"].each do |topic|
        learning_module.topics << Topic.find(topic)
    end

    learning_module.contents = []

    data["contents"] = data["contents"] || []
    data["contents"].each do |content|
        learning_module.contents << Content.find(content)
    end

    learning_module.contents.each do |content|

        # Handle full save, including comments
        entity = Content.find(get_id(content))
        entity.comments = []

        if content["comments"]
            content["comments"].each do |comment|
                entity.comments << Comment.new(text: comment["text"])
            end
        end


        entity.save
        learning_module.contents << entity
    end

    learning_module.save

    content_type :json
    {success: true, learning_module: learning_module}.to_json
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

  post :finished_module do

    data = get_body

    learning_module = LearningModule.find(data["module"])
    project = Project.where(slug: data["project"]).first

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

  get :next, :with => [:project, :module] do

    content_type :json
    next_modules(params[:project], params[:module]).to_json

  end

  get :next, :with => [:project] do

    content_type :json
    next_modules(params[:project]).to_json

  end

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



def next_modules(project, learning_module = nil)
    # Calculate relevance score of all other modules
        # Based on existing topic scores
        # Biased by the module that was just finished (bonus to its topic scores?)
        # Take into account meta feedback, like other user's paths

    project = Project.where(slug: project).first

    if !learning_module.nil?
        last_module = LearningModule.find(learning_module)
    else
        last_module = project.last_module
    end

    topic_lookup = {}
    module_lookup = {}

    project.topic_scores.each do |topic_score|
        topic_lookup[topic_score.topic.id] = topic_score.score
    end

    learning_modules = LearningModule.all

    learning_modules.each do |learning_module|
        module_lookup[learning_module.id] = calculate_score learning_module, topic_lookup, last_module
    end

    sorted = module_lookup.sort_by{|k, v| v}.reverse
    result = []
    count = 0
    sorted.each do |learning_module|
        temp = LearningModule.find(learning_module[0])
        temp["relevance"] = learning_module[1]

        # Do not include the same module again

        if last_module.nil? or learning_module[0] != last_module.id
          result << temp
          count = count + 1
        end

        if count >= 4 then break end
    end

    result
end





def calculate_score(learning_module, lookup, bias_module)

  score = 0

  # still need initial topic bias from project initialisation
  transition_bias = Transition.where(from: bias_module, to: learning_module).count

  learning_module.topics.each do |topic|
      if lookup[topic.id]
        score = score + lookup[topic.id]
      end

      # Does this module get a bonus?
      if !bias_module.nil? and
        bias_module.topics.where(id: topic.id).exists? and
        bias_module.id != learning_module.id then

          score = score + 2

      end
  end

  score = score + transition_bias
  score
end





def get_id(obj)
   id = nil
   begin
      # db object
      id = obj["_id"]["$oid"]
   rescue
      begin
        # Custom format
        id = obj["id"]
      rescue
        # When we have a list of strings
        id = obj
      end
   end

   puts ">>> Got id " + id.to_s
   id
end






def build_graph(project, start_node)

  # Get all modules
  topic_lookup = {}
  module_lookup = {}

  project.topic_scores.each do |topic_score|
      topic_lookup[topic_score.topic.id] = topic_score.score
  end

  learning_modules = LearningModule.all

  learning_modules.each do |learning_module|
      module_lookup[learning_module.id] = calculate_score learning_module, topic_lookup, start_node
  end

  # Using all topics, generate all links (relevance > 0)
  nodes = []
  links = []

  nodes << {name: start_node.title, group: 0}

  module_lookup.each do |key, value|

    next if value == start_node

    lm = LearningModule.find(key)

    nodes << {name: lm.title, group: 1}
    if value > 0
      links << {source: 0, target: nodes.length - 1, value: value}
    end

  end

  {nodes: nodes, links: links}
end

def build_full_graph(project)

  nodes = []
  links = []
  index_lookup = {}
  topic_lookup = {}

  project.topic_scores.each do |topic_score|
      topic_lookup[topic_score.topic.id] = topic_score.score
  end

  learning_modules = LearningModule.all

  learning_modules.each do |learning_module|
    nodes << {name: learning_module.title}
    index_lookup[learning_module.id] = nodes.length - 1
  end

  learning_modules.each do |source|
    learning_modules.each do |target|
      next if source == target

      score = calculate_score target, topic_lookup, source

      if score > 0
        links << {source: index_lookup[source.id], target: index_lookup[target.id], value: score}
      end
    end
  end

  {nodes: nodes, links: links}

end
