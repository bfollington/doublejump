var landing = new function ()
{
    this.init = function ()
    {
        $(".landing-page-tab").click( function(e) {
            e.preventDefault();
            var index = parseInt($(this).attr("data-target"));

            console.log(index);
            var $boxes = $(".landing-page-box");

            $boxes.removeClass("visible");
            $( $boxes[index] ).addClass("visible");
        });
    }
}
