class MathContent < Content

    field :before, :type => String
    field :body, :type => String
    field :after, :type => String

    validates_presence_of :body, :message => "You can't have an empty content block, that makes no sense."

    def editing_partial
        "js-templates/editing/math"
    end

    def get_final_html(view)
        view.render "learn/content_types/_math", :layout => false, :locals => {math: self}
    end

    def get_content
        body
    end

end

