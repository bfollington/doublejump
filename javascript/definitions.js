// definitions.js handle definition lookups

function bindDefinitions()
{
    $("a[rel='definition']").click( function(e) {
        var $definition = $(this);

        e.preventDefault();

        var query = $(this).attr("data-query");

        $.ajax({
            url: "/definitions/define/" + query,
            success: function (data) { 
                if (data != 'null')
                {
                    $(".step-body .js-inserted-definition").remove();

                    var template = format(
                                        getTemplate("_inserted_definition"), 
                                        {
                                            "definition-title": data.title,
                                            "definition-body": marked(data.body),
                                            "definition-id": marked(data.id)
                                        }
                                    );

                    $definition.parent().after(template);
                    animate($definition.parent().next(), "fadeInUp");

                    $(".js-close-inserted-definition").click( function(e) {
                        e.preventDefault();

                        animate($(this).parent(), "fadeOutDown", function($el) { $el.remove(); });
                    });
                }
            },
            timeout: 3000,
            dataType: 'json',
            error: function(data) {
                console.log("Could not load definition.");
            }
        });
    });

    $(".js-insert-definition").click( function(e) {
        e.preventDefault();

        var html = '{definition{TITLE, TERM}}';
        prompt("Macro:", html);

        editor.focus();
    });

    $(".js-insert-inline-definition").click( function(e) {
        e.preventDefault();

        var html = '{inline-definition{TERM}}';
        prompt("Macro:", html);

        editor.focus();
    });
}

bindDefinitions();