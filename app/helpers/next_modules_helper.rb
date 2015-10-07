Doublejump::App.helpers do

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
      puts sorted.inspect
      result = []
      count = 0
      sorted.each do |learning_module|
          temp = LearningModule.find(learning_module[0])
          temp["relevance"] = learning_module[1]

          # Do not include a module again
          if !project.learning_modules.include? temp and has_prereqs? project, temp

            # specific edge case for last module completed
            if last_module.nil? or learning_module[0] != last_module.id
              result << temp
              count = count + 1
            end

          end

          if count >= 4 then break end
      end

      result.map{ |mod| mod.to_hash }
  end



  def calculate_score(learning_module, lookup, bias_module)

    score = 0

    # still need initial topic bias from project initialisation
    transition_bias = Transition.where(from: bias_module, to: learning_module).count

    learning_module.topics.each do |topic|
        if lookup[topic.id]
          score = score + lookup[topic.id]
        end

        relevance = TopicRelevance.where(learning_module: learning_module, topic: topic).count
        score = score + relevance * 2

        if !bias_module.nil?
          # "Follow ons" should get a large boost
          if bias_module.dependents.include? learning_module
            score = score * 1.1
          end

          # Does this module get a bonus?
          if bias_module.topics.where(id: topic.id).exists? and
             bias_module.id != learning_module.id then
              score = score + 2
          end
        end


    end

    score = score + transition_bias
    score
  end

end
