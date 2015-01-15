// hideable-region.js

var hideable = new function()
{
    var self = this;
    self.createHideableRegions = function()
    {
        $(".hideable-inner").each( function () {

            var $contentBlock = $(this).closest(".content-block");
            var $content = $contentBlock.next();

            $content.css("visibility", "hidden");
        });

        $(".js-toggle-hideable").click( function(e) {
            e.preventDefault();

            var $contentBlock = $(this).closest(".content-block");
            var $content = $contentBlock.next();

            if (isVisible($content))
            {
                $(this).text("Expand");
                animateElement( $content, "fadeOutLeftBig", function ($elem) { $elem.css("visibility", "hidden"); } );
            } else {
                $(this).text("Hide");
                $content.css("visibility", "visible");
                animateElement( $content, "fadeInLeftBig" );
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

