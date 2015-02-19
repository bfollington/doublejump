var CommentIconView = (function() {
    return Pillar.View.extend({
        init: function(opts)
        {
            this.params = opts.params;
            this.model.on("change", this.render, this);
        },

        events: {

        },

        template: templateHtml("sortable_content_list_entry"),

        draw: function(opts)
        {
            var data = this.model.toJSON();
            data.cssClass = this.cssClass();
            var html = Mustache.render(this.template, this.model.toJSON());
            this.replaceElement(html);
        }
    });
})();
