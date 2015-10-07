Doublejump::App.helpers do

    def attach_completed_modules(project)
      project["completed_modules"] = []

      project.learning_module_ids.each do |id|
        project["completed_modules"] << id.to_s
      end

      project
    end

    def has_prereqs?(project, learning_module)

      yep = true

      learning_module.prereqs.each do |prereq|

        if !project.learning_modules.include? prereq
          yep = false
          break
        end
      end

      yep

    end

end
