class HideableContent < Content

    field :title, :type => String, :overwrite => true

    validates_presence_of :title

    def editing_partial
        "ui/js/editing/hideable"
    end

    def get_final_html(view)
        view.render "learn/content_types/_hideable", :layout => false, :locals => {hideable: self}
    end

    def get_content
        text
    end

end

