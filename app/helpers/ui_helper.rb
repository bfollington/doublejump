Doublejump::App.helpers do

  def ui_element(name, params)
    partial name, :locals => { :supplied_params => params }
  end

  def ui_from_object(name, obj)
    partial name, :object => obj
  end

  def ui_from_collection(name, collection)
    partial name, :collection => collection
  end

end
