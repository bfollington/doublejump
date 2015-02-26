var animate = require("util/animate-util");

// definitions.js handle definition lookups

var definitions = new function()
{
    var self = this;

    self.convertDefinitionLinks = function()
    {
        $('a[href^="define:"]').each( function () {
            $(this).attr("rel", "definition");

            var query = $(this).attr("href").replace("define:", "");

            $(this).attr("data-query", query);
        });
    }

    self.bindDefinitions = function()
    {
        $("a[rel='definition']").click( function(e) {
            var $definition = $(this);

            e.preventDefault();

            var query = $(this).attr("data-query");

            $definition.after(loadingIndicator);

            $.ajax({
                url: "/definitions/define/" + query,
                success: function (data) {
                    if (data != "null" && data != null)
                    {
                        $(".step-body .js-inserted-definition").remove();

                        var model = {
                            title: data.title,
                            body: marked(data.body),
                            id: data._id["$oid"]
                        };

                        var html = Mustache.render(templateHtml("inserted_definition"), model);

                        $definition.parent().after(html);
                        animate.animate($definition.parent().next(), "fadeInUp");

                        if (mathjax) MathJax.Hub.Queue(["Typeset", MathJax.Hub, $definition.parent().next()[0]]);

                        $(".js-close-inserted-definition").click( function(e) {
                            e.preventDefault();

                            animate.animate($(this).parent(), "fadeOutDown", function($el) { $el.remove(); });
                        });

                    }

                    $definition.next().remove();
                },
                timeout: 3000,
                dataType: 'json',
                error: function(data) {
                    $definition.next().remove();
                    console.log("Could not load definition.");
                }
            });
        });

        $(".js-insert-definition").click( function(e) {
            e.preventDefault();

            var html = '{definition{"TITLE", "TERM"}}';
            prompt("Macro:", html);

            editor.focus();
        });

        $(".js-insert-inline-definition").click( function(e) {
            e.preventDefault();

            var html = '{inline-definition{"TERM"}}';
            prompt("Macro:", html);

            editor.focus();
        });

        $(".js-insert-inline-tex").click( function(e) {
            e.preventDefault();

            var html = "\\\\( \\\\)";
            prompt("Tex:", html);

            editor.focus();
        });

        $(".js-insert-block-tex").click( function(e) {
            e.preventDefault();

            var html = "\\\\[ \\\\]";
            prompt("Tex:", html);

            editor.focus();
        });

        $(".js-insert-two-cols").click( function(e) {
            e.preventDefault();

            var html = '{two-columns{"one", "two"}}';
            prompt("Macro:", html);

            editor.focus();
        });

        $(".js-insert-one-col").click( function(e) {
            e.preventDefault();

            var html = '{one-column{"content"}}';
            prompt("Macro:", html);

            editor.focus();
        });
    }
}

module.exports = definitions;
