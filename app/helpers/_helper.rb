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

  def list_exists(list)
    return !list.nil? && ( list.length > 0 )
  end

  def interable_list(list)

    if !list.nil? && ( list.length > 0 )
      return list
    else
      return []
    end

  end
  
end
