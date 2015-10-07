Doublejump::App.helpers do

    # Annotates a project object with its own metadata
    def attach_metadata(project)

      project["metadata"] = {}

      project.metadatas.each do |metadata|
        project["metadata"][metadata.key] = metadata.value
      end

      project["metadata"]["topic_scores"] = {}

      project.topic_scores.each do |score|
        project["metadata"]["topic_scores"][score.topic.key_name] = score.score
      end

      project["metadata"]["learning_modules"] = {}
      project.learning_modules.each do |learning_module|
        project["metadata"]["learning_modules"][learning_module.key_name] = true
      end


      project
    end

end
