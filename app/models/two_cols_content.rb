class TwoColsContent < Content

    def editing_partial
        "js-templates/editing/two_cols"
    end

    def get_final_html(view)
        view.render "learn/content_types/_two_cols", :layout => false, :locals => {two_cols: self}
    end

end

