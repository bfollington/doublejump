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

    $(".step-body img").addClass("lazy");
}

setUpBannerImage();

function scrollBinding()
{
    $('.step-body').waypoint(function(direction) {

        if (direction == "down")
        {
            $(".fixed-bars").fadeIn();
        } else {
            $(".fixed-bars").fadeOut();
        }
    });
}

scrollBinding();