// hideable-region.js

var hideable = new function()
{
    var self = this;
    self.createHideableRegions = function()
    {
        $(".hideable-inner").each( function () {
            $(this).find(".content").hide();
        });

        $(".js-toggle-hideable").click( function(e) {
            e.preventDefault();

            var content = $(this).parent().find(".content");

            if (isVisible(content))
            {
                $(this).text("Expand");
                animateElement( content, "fadeOutDown", function ($elem) { $elem.hide(); } );
            } else {
                $(this).text("Hide");
                content.css("display", "block");
                animateElement( content, "fadeInUp" );
            }

            
        });
    }

    self.bindInsertRegionButton = function()
    {
        $(".js-insert-hideable").click( function(e) {
            e.preventDefault();

            var html = '{hideable{TITLE, CONTENT}}';
            prompt("Macro:", html);

            editor.focus();
        });
    }
}

hideable.createHideableRegions();
hideable.bindInsertRegionButton();

