# Helper methods defined here can be accessed in any controller or view in the application

LearnToGameDev::App.helpers do

  def errors_for (object, field)
    if object && object.errors
        return object.errors.messages[field]
    else
        return {}
    end
  end

  def aws_url()
    return 'https://s3-ap-southeast-2.amazonaws.com/voltic-test-bucket/'
  end

  def render_js_template(name)
    @template = name
    render 'js-templates/template', :layout => false
  end
  
end
