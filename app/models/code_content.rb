class CodeContent < Content

    field :body, :type => String
    field :language, :type => String

    validates_presence_of :body, :message => "You can't have an empty content block, that makes no sense."

    def editing_partial
        "js-templates/editing/code"
    end

    def get_final_html(view)
        render "learn/content_types/_code.slim", locals => {code: self}
    end

    def get_content
        body
    end

end

