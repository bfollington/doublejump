/**
 * Calls an Animate.css animation on the provided selector
 * @param  {[type]} element_ID [description]
 * @param  {[type]} animation  [description]
 */
function animate(element_ID, animation, completeCallback) {

    if (supportsTransitions())
    {
        if ($(element_ID).attr("data-timeout-id"))
        {
            window.clearTimeout($(element_ID).attr("data-timeout-id"));
        }

        $(element_ID).addClass(animation);
        $(element_ID).addClass("animated");

        var timeoutId = window.setTimeout( function () {

            $(element_ID).removeClass(animation);
            $(element_ID).removeClass("animated");

            if (completeCallback != null)
            {
                completeCallback();
            }

        }, 2000);

        $(element_ID).attr("data-timeout-id", timeoutId);

        $(element_ID).off();
        $(element_ID).one("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", 
            function() {
                $(element_ID).removeClass(animation);
                $(element_ID).removeClass("animated");

                if (completeCallback != null)
                {
                    completeCallback();
                }
            }
        );
    } else {
        completeCallback();
    }


}