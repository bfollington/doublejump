# Helper methods defined here can be accessed in any controller or view in the application

LearnToGameDev::App.helpers do
  # def simple_helper_method
  #  ...
  # end
  
  def errors_for (object, field)
    if object && object.errors
        return object.errors.messages[field]
    else
        return {}
    end
  end

end
