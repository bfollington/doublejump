// learn.js modifies the learn page layout to inject images etc.

function setUpBannerImage()
{
    $(".banner-image").each( function() {
        var $this = $(this);

        if ($this.attr("data-background") && $this.attr("data-background") != "")
        {
            $this.css("background-image", "url(" + $this.attr("data-background") + ")");
        }
    });

    $(".step-body img").addClass("lazy").wrap( "<a href='#' data-fluidbox></a>" );
    $("a[data-fluidbox]").fluidbox({ overlayColor: "rgba(0, 0, 0, 0.5)" });
}

setUpBannerImage();