function createHideableRegions()
{
    $(".hideable-inner").each( function () {
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

        var html = '{hideable{TITLE, CONTENT}}';
        prompt("Macro:", html);

        editor.focus();
    });
}

bindInsertRegionButton();