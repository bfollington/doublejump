class MarkdownContent < Content

    field :body, :type => String

    validates_presence_of :body, :message => "You can't have an empty content block, that makes no sense."

    def editing_partial
        "elements/editing/markdown"
    end

    # Legacy support for all macros used in steps originally
    def get_final_html(view)
        body_edited = expand_macros self.body, view
        body_edited = RDiscount.new(body_edited, :no_superscript).to_html
        body_edited = lazy_load_images body_edited

        return body_edited
    end


    def lazy_load_images(body)
        body.gsub("src=", "data-original=")
    end

    def expand_macros(body, view)

        edited_body = body

        body.scan(Step.macro_regex).each do |match|
            puts "match 0: " + match[0]
            edited_body.gsub!(match[0], process_macro(match, view))
        end

        edited_body

    end

    def process_macro(macro, view)

        name =  macro[1]
        params = macro[2].split(/\",\s*\"/)
        params[0] = params[0][1..-1]
        params[-1] = params[-1][0..-2]

        puts macro.inspect
        puts params.inspect

        if (name == "definition")
            link_text = params[0]
            term = params[1].downcase

            definition = Definition.where(:search_title => params[1].downcase).first
            if definition.nil?
                invalid_term = true
            end

            view.render 'macros/definition', :layout => false, :locals => {link_text: params[0], term: params[1].downcase, invalid_term: invalid_term}
        elsif (name == "two-columns")
            left = RDiscount.new(params[0], :no_superscript).to_html
            right = RDiscount.new(params[1], :no_superscript).to_html

            view.render 'macros/two-columns', :layout => false, :locals => {left: left, right: right}
        elsif (name == "one-column")
            content = RDiscount.new(params[0], :no_superscript).to_html
            view.render 'macros/one-column', :layout => false, :locals => {content: content}
        elsif (name == "interactive")
            view.render 'interactive/' + params[0], :layout => false
        elsif (name == "hideable")
            item_text = RDiscount.new(params[1], :no_superscript).to_html
            item_title = params[0]
            view.render 'macros/hideable', :layout => false, :locals => {item_text: item_text, item_title: item_title}
        elsif (name == "inline-definition")

            definition = Definition.where(:search_title => params[0].downcase).first

            if !definition.nil?
                definition_body = RDiscount.new(definition.body, :no_superscript).to_html
                definition_title = definition.title
                definition_id = definition.id
                view.render 'macros/inline-definition', :layout => false, :locals => {definition: definition_body, definition_title: definition_title, definition_id: definition_id}
            else
                "Invalid Definition Term."
            end


        else
            macro[0]
        end

    end

end

