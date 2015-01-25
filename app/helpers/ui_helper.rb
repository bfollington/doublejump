Doublejump::App.helpers do

  def ui_element(name, params={})
    partial name, :locals => { :supplied_params => params }
  end

  def capture_to_local(var, &block)
    set_var = block.binding.eval("lambda {|x| #{var} = x }")
    # In Rails we have to use capture!
    # If we are using Slim without a framework (Plain Tilt),
    # you can just yield to get the captured block.
    set_var.call(defined?(::Rails) ? capture(&block) : yield)
  end

  def ui_from_object(name, obj)
    partial name, :object => obj
  end

  def ui_from_collection(name, collection)
    partial name, :collection => collection
  end

end
