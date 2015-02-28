var Pillar = require("pillar/pillar"),
    animate = require("util/animate-util");

module.exports = Pillar.View.extend({
    init: function(opts)
    {
        opts = opts || {};
        this.params = opts.params || {};
    },

    events: {
        "click .js-close-comments": "closeComments",
        "click .comment-frame": "test"
    },

    template: Pillar.template("comment_list"),

    closeComments: function(e)
    {
        e.preventDefault();
        console.log("woo");
        animate.animateElement(this.$el, "fadeOutDown", this.fadeOut, this);
    },

    fadeOut: function($el, context)
    {
        context.remove();
    },

    getData: function()
    {
        return {};
    },

    draw: function(opts)
    {
        var data = this.getData();
        data.content_id = this.params.content_id;
        data.shared_image_id = this.$el.attr("data-shared-image");

        var html = Mustache.render(this.template, data);
        this.replaceElement(html);

        this.$el.css("display", "block");
        animate.animateElement(this.$el, "fadeInUp", null);
    }
});
