Doublejump::App.helpers do

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

      if !project.learning_modules.find(lm).nil?
        nodes << {name: lm.title, group: 2}
      else
        nodes << {name: lm.title, group: 1}
      end

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

      if !project.learning_modules.include?(learning_module)
        nodes << {name: learning_module.title, group: 2}
      else
        nodes << {name: learning_module.title, group: 1}
      end

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

end


