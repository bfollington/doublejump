var iconTab = new function ()
{
    this.initialised = false;

    this.init = function ()
    {
        if (!this.initialised)
        {
            $(".icon-button-tab").click( function(e) {
                e.preventDefault();
                var index = parseInt($(this).attr("data-target"));

                console.debug(index);
                var $boxes = $(".landing-page-box");

                $boxes.removeClass("visible");
                $( $boxes[index] ).addClass("visible");
            });

            this.initialised = true;
        }
    }
}

module.exports = iconTab;
