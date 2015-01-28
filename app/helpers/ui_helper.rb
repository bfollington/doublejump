Doublejump::App.helpers do

  def ui_element(name, params={})
    partial name, :locals => { :supplied_params => params }
  end

  def ui_mustache(name, params={})
    stache = render_partial name
    Mustache.render(stache, params)
  end

  def ui_from_object(name, obj)
    partial name, :object => obj
  end

  def ui_from_collection(name, collection)
    partial name, :collection => collection
  end

  def ui_uses(name)
    partial 'js-templates/include', locals: {name: name}
  end

end
