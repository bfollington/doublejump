var Pillar = require("pillar/pillar"),
    template = require("util/templating-util"),
    CommentListView = require("ui/js/_comment_list_view");

module.exports = CommentIconView;

var CommentIconView = Pillar.View.extend({
    init: function(opts)
    {
        this.params = opts.params;
        console.log(this.model);
    },

    events: {
        "click .js-show-comments": "showComments"
    },

    showComments: function(e)
    {
        e.preventDefault();

        var list = new CommentListView({params: {content_id: this.model.content}});
        var el = list.render().el;

        $("body").append( el );
        console.log("Comment List added", el);
    },

    template: Pillar.template("comment_icon"),

    draw: function(opts)
    {
        var data = this.model.toJSON();
        var html = Mustache.render(this.template, data);
        this.replaceElement(html);
    }
});

module.exports = CommentIconView;
