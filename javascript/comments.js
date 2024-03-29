var eventUtil = require("util/event-util"),
    util = require("util/_util"),
    animate = require("util/animate-util");

// comments.js powers the comment frame for articles and images
var comments = new function()
{
    var self = this;

    self.bindComments = function()
    {
        console.log("BINDING COMMENTS");
        var id = "#comment_frame";
        var $frame = $(id);

        $(".step-body .comment, .shared-wrapper .comment").each( function() {

            var $comment = $(this);
            // Almost always the column content resides in
            var $parent = $(this).parent().parent().parent().parent();
            // This will be a .hideable-inner in an edge case
            var $otherParent = $(this).parent().parent().parent();
            var $sibling = $(this).prev();

            $(this).find('a').on("touchstart, click", function (e) {

                e.preventDefault();

                eventUtil.stopEventPropagating(e);

                // Do not interrupt a transition
                if (!$("#comment_frame").hasClass("animated"))
                {

                    $comment.append(loadingIndicator);

                    var url = "";
                    var offsetLeft, offsetTop;

                    if ($parent.attr("id") == "sharing_lightbox")
                    {
                        url = "/comments/image-get/" + $parent.attr("data-id");
                        offsetLeft = -160;
                        offsetTop = "auto";
                    } else {
                        var currentStep = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);
                        currentStep = currentStep.split("#")[0];
                        currentStep = currentStep.split("?")[0];

                        url = "/comments/get/" + currentStep + "/" + $(this).parent().attr("data-group");

                        offsetLeft = 32;
                        offsetTop = -64;
                    }

                    $.ajax({
                        url: url,
                        success: function (data) {
                            if (data.success)
                            {
                                $frame.html(data.html);
                                self.showCommentFrame(id, $frame, $comment, offsetLeft, offsetTop);
                            }

                            $comment.children().last().remove();
                        },
                        timeout: 3000,
                        dataType: 'json',
                        error: function(data) {
                            $frame.html("Could not load comments.");
                            self.showCommentFrame(id, $frame, $comment, offsetLeft, offsetTop);
                            $comment.children().last().remove();
                        }
                    });

                }

            } );

        } );

        $('html').on( "touchstart, click", function (e) {

            if ( eventUtil.eventTargetDoesNotInclude(e, '#comment_frame') )
            {
                if (!$frame.hasClass("animated") && $frame.css("display") == "block")
                {
                    animate.animate(id, 'fadeOutUp', function() { $frame.css("display", "none"); });
                }
            }
        });
    }

    self.showCommentFrame = function(id, $frame, $comment, offsetLeft, offsetTop)
    {

        var autoOffset = (offsetTop == "auto");

        if (!offsetLeft) offsetLeft = 32;
        if (!offsetTop) offsetTop = -64;

        $frame.css("display", "block");

        if (util.findBootstrapEnvironment() == "ExtraSmall")
        {
            // Centre the display on mobiles
            $frame.offset({ left: getViewportWidth() / 2 - $frame.outerWidth() / 2, top: $comment.offset().top + offsetTop});
        } else {

            // Stop comments panel sticking off the right side of the display
            if ($comment.offset().left + offsetLeft + $frame.outerWidth() >= util.getViewportWidth())
            {
                $frame.offset({ left: getViewportWidth() - $frame.outerWidth() - 10, top: $comment.offset().top + offsetTop});
            } else {
                // Just display it normally
                $frame.offset({ left: $comment.offset().left + offsetLeft, top: $comment.offset().top + offsetTop});
            }


        }



        animate.animate(id, 'fadeInDown', null);

        $("form#Comment").off();

        $("form#Comment").ajaxForm({
            beforeSubmit:  function () {
                $frame.find(".errors").text("");
                $("form#Comment").find('input[type="submit"]').attr("disabled", "disabled");
            },
            success: function (data) {
                if (data.success)
                {
                    $frame.html(data.html);
                } else {
                    appendErrors(data.errors, $frame, ".errors");
                }

                $("form#Comment").find('input[type="submit"]').attr("disabled", false);
            },
            error: function (data) {
                $frame.find(".errors").append("Could not post comment, try again?");
                $("form#Comment").find('input[type="submit"]').attr("disabled", false);
            }
        });

        if (autoOffset)
        {
            $frame.offset({top: $comment.offset().top - $frame.height() - 32});
        }


        $(".js-close-comments").click( function(e) {
            e.preventDefault();

            animate.animate(id, 'fadeOutUp', function() { $frame.css("display", "none"); });

        });

        $(".js-delete-comment").bind('click', function (e) {

            e.preventDefault();

            if (confirm("Delete this comment?"))
            {
                var $commentEntry = $(this).parent().parent();

                $.get( $(this).attr("href") )
                    .done( function(data) {
                        if (data.success)
                        {
                            $commentEntry.remove();
                        }
                    })
                    .fail( function(data) {

                    });
            }
        });

        $(".js-report-comment").bind('click', function (e) {

            e.preventDefault();

            if (confirm("Report this comment?"))
            {
                $.get( $(this).attr("href") )
                    .done( function(data) {
                        if (data.success)
                        {
                            alert("Comment reported, thanks!");
                        } else {
                            alert("Comment already reported.")
                        }
                    })
                    .fail( function(data) {

                    });
            }
        });
    }
}

module.exports = comments;
