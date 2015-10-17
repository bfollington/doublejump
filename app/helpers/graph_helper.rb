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

    nodes << {name: start_node.title, group: "current", oid: start_node.id.to_s}

    module_lookup.each do |key, value|

      lm = LearningModule.find(key)

      next if lm == start_node

      if !project.learning_modules.include?(lm)
        nodes << {name: lm.title, group: "new", oid: lm.id.to_s}
      else
        nodes << {name: lm.title, group: "done", oid: lm.id.to_s}
      end

      if value > 0
        links << {source: 0, target: nodes.length - 1, value: value}
      end

    end

    {nodes: nodes, links: links}
  end

  def build_full_graph(project, start_node = nil)

    nodes = []
    links = []
    index_lookup = {}
    topic_lookup = {}

    project.topic_scores.each do |topic_score|
        topic_lookup[topic_score.topic.id] = topic_score.score
    end

    learning_modules = LearningModule.all
    starting_module = LearningModule.find(start_node)

    learning_modules.each do |learning_module|

      if !start_node.nil? && learning_module == starting_module
        nodes << {name: learning_module.title, group: 0}
      elsif !project.learning_modules.include?(learning_module)
        nodes << {name: learning_module.title, group: 2}
      else
        nodes << {name: learning_module.title, group: 1}
      end

      index_lookup[learning_module.id.to_s] = nodes.length - 1
    end


    learning_modules.each do |mod|
        recommendations = next_modules(project.slug, starting_module)

        recommendations.each do |recommendation|
            link = {source: index_lookup[mod.id.to_s], target: index_lookup[recommendation[:id]], value: recommendation[:relevance]}
            links << link
        end
    end

    {nodes: nodes, links: links}

  end

end
