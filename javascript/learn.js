// learn.js modifies the learn page layout to inject images etc.

var learn = new function()
{
    var self = this;
    
    self.setUpBannerImage = function()
    {
        $(".banner-image").each( function() {
            var $this = $(this);

            var bg = $this.attr("data-background");

            if (bg && bg != "" && bg[0] != '#')
            {
                $this.css("background-image", "url(" + bg + ")");
            } else if (bg && bg != "")
            {
                $this.css("background-color", bg);
            }
        });

        $("[data-bg]").each( function() {
            $(this).css("background-color", $(this).attr("data-bg"));
        });

        $("[data-colour]").each( function() {
            $(this).css("color", $(this).attr("data-colour"));
        });

        if (jQuery().lazyload)
        {
            $(".step-body img").lazyload(
            {
                threshold : 200,
                load: self.lazyLoadHandler
            });
        }
    }

    // Add the intense viewer to the images
    self.lazyLoadHandler = function()
    {
        $(this).attr("data-caption", $(this).attr("alt"));
        $(this).addClass("plus-cursor");
        Intense( this );
    }
}

learn.setUpBannerImage();