var util = require("util/_util");

/**
 * Calls an Animate.css animation on the provided selector
 * @param  {[type]} element_ID [description]
 * @param  {[type]} animation  [description]
 */
function animate(element_ID, animation, completeCallback, context) {

    animateElement($(element_ID), animation, completeCallback, context);

}

function animateElement($element, animation, completeCallback, context) {

    if (util.supportsTransitions())
    {
        if ($element.attr("data-timeout-id"))
        {
            window.clearTimeout($element.attr("data-timeout-id"));
        }

        $element.addClass(animation);
        $element.addClass("animated");

        var timeoutId = window.setTimeout( function () {

            if ($element.hasClass("animated"))
            {
                $element.removeClass(animation);
                $element.removeClass("animated");

                if (completeCallback != null)
                {
                    completeCallback($element);
                }
            }
        }, 2000);

        $element.attr("data-timeout-id", timeoutId);

        $element.off();
        $element.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
            function() {
                $element.removeClass(animation);
                $element.removeClass("animated");
                $element.trigger("animationOver");

                if (completeCallback != null)
                {
                    completeCallback($element, context);
                }
            }
        );
    } else {
        completeCallback($element);
    }


}

module.exports = {
    animate: animate,
    animateElement: animateElement
}
