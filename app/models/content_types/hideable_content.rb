class HideableContent < Content

    field :title, :type => String

    validates_presence_of :title

    def editing_partial
        "js-templates/backbone/editing/hideable"
    end

    def get_final_html(view)
        view.render "learn/content_types/_hideable", :layout => false, :locals => {hideable: self}
    end

    def get_content
        text
    end

end

