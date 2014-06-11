// learn.js modifies the learn page layout to inject images etc.

function setUpBannerImage()
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

    if (jQuery().lazyload)
    {
        $(".step-body img").lazyload(
        {
            threshold : 200,
            load: lazyLoadHandler
        });
    }
    

    
}

setUpBannerImage();

function lazyLoadHandler()
{
    if (!$(this).attr("data-zoominit"))
    {
        $(this)
        .attr("data-zoominit", true)
        .wrap('<div class="zoom-wrapper" style="width:' + $(this).outerWidth() + 'px;"></div>')
        .parent()
        .zoom({ on:'mouseover', magnify: 1.5 });
    }

    //$(".zoom-wrapper").css("overflow", "visible");
}