Doublejump::App.helpers do

  def content_for_once( section, widget_id, &block )
      @included_widgets ||= []
      unless @included_widgets.include?(widget_id)
          @included_widgets << widget_id
          content_for(section, &block)
      end
  end

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
    partial 'ui/js/include', locals: {name: name}
  end

end
