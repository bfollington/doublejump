function setUpBannerImage()
{
    $(".banner-image").each( function() {
        var $this = $(this);

        if ($this.attr("data-background") && $this.attr("data-background") != "")
        {
            $this.css("background-image", "url(" + $this.attr("data-background") + ")");
        }
    });
}

setUpBannerImage();