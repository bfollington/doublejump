class CodeContent < Content

    field :body, :type => String, :overwrite => true
    field :language, :type => String, :overwrite => true

    validates_presence_of :body, :message => "You can't have an empty content block, that makes no sense."

    def editing_partial
        "ui/js/editing/code"
    end

    def get_final_html(view)
        view.render "learn/content_types/_code", :layout => false, :locals => {code: self}
    end

    def get_content
        body
    end

end

