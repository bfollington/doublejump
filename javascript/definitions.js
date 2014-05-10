// definitions.js handle definition lookups

function bindDefinitions()
{
    $("a[rel='definition']").mouseenter( function(e) {
        var $definition = $(this);

        var query = $(this).attr("data-query");

        $.ajax({
            url: "/definitions/define/" + query,
            success: function (data) { 
                if (data != 'null')
                {
                    $definition.popover(
                        {
                            trigger: "manual",
                            placement: "top",
                            title: $definition.text(),
                            content: marked(data.body),
                            html: true
                        }
                    );

                    $definition.popover("show");
                }
            },
            timeout: 1000,
            dataType: 'json',
            error: function(data) {
                console.log("Could not load definition.");
            }
        });
    });

    $("a[rel='definition']").mouseleave( function(e) {
        $(this).popover("hide");
    });

    $(".js-insert-definition").click( function(e) {
        e.preventDefault();

        var term = prompt("Enter definition term:");

        if (term)
        {
            var html = '<a href="/definitions/view/' + term.toLowerCase() + '" rel="definition" data-query="' + term.toLowerCase() + '">LINK TEXT</a>';
            prompt("Link HTML:", html);
        }
    });
}

bindDefinitions();