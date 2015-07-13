class MathContent < Content

    field :before, :type => String, :overwrite => true
    field :body, :type => String, :overwrite => true
    field :after, :type => String, :overwrite => true

    validates_presence_of :body, :message => "You can't have an empty content block, that makes no sense."

    def editing_partial
        "ui/js/editing/math"
    end

    def get_final_html(view)
        view.render "learn/content_types/_math", :layout => false, :locals => {math: self}
    end

    def get_content
        body
    end

end

