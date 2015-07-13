class DefinitionContent < Content

    field :term, :type => String, :overwrite => true

    validates_presence_of :term

    def editing_partial
        "ui/js/editing/definition"
    end

    def get_final_html(view)
        view.render "learn/content_types/_definition", :layout => false, :locals => {definition: self}
    end

    def get_definition
        definition = Definition.where(:search_title => term.downcase).first
    end

    def get_content
        body
    end

end

