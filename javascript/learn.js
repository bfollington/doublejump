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

    //$(".step-body img").addClass("lazy").wrap( "<a href='#' data-fluidbox></a>" );
    //$("a[data-fluidbox]").fluidbox({ overlayColor: "rgba(0, 0, 0, 0.5)" });

    $(".step-body img").attr("data-closeclick", true);
    $(".step-body img").attr("data-targetsize", 0.95);
    $(".step-body img").attr("data-duration", 200);
    $(".step-body img").attr("data-easing", "ease");
    $(".step-body img").attr("data-nativeanimation", false);
    $(".step-body img").zoomTarget();
}

setUpBannerImage();