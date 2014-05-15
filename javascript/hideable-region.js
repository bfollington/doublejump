function createHideableRegions()
{
    $(".hideable").each( function () {
        var html = $(this).html();
        var title = $(this).attr("data-title");

        $(this).html(
            format(
                getTemplate("_hideable_region"), 
                {
                    "item-text": html,
                    "item-title": title
                }
            )
        );

        $(this).find(".content").hide();
    });

    $(".js-toggle-hideable").click( function(e) {
        e.preventDefault();

        var content = $(this).parent().find(".content");

        if (isVisible(content))
        {
            animateElement( content, "fadeOutDown", function ($elem) { $elem.hide(); } );
        } else {
            content.css("display", "block");
            animateElement( content, "fadeInUp" );
        }

        
    });
}

createHideableRegions();

function bindInsertRegionButton()
{
    $(".js-insert-hideable").click( function(e) {
        e.preventDefault();

        var term = prompt("Enter hideable region content:");

        if (term)
        {
            var html = '<div class="hideable" data-title="TITLE FOR HIDEABLE REGION">' + term + '</div>';
            prompt("Hideable Region HTML:", html);
        }
    });
}

bindInsertRegionButton();