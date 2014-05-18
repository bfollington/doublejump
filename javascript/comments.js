// comments.js powers the comment frame for articles and images

function bindComments()
{

    var id = "#comment_frame";
    var $frame = $(id);

    $(".step-body .comment, #sharing_lightbox .comment").each( function() {

        var $comment = $(this);
        var $parent = $(this).parent().parent().parent().parent();

        if ($parent.attr("id") != "sharing_lightbox") $(this).html(getTemplate("_comment_icon"));

        $(this).find('a').click( function (e) { 

            e.preventDefault();

            stopEventPropagating(e);

            // Do not interrupt a transition
            if (!$("#comment_frame").hasClass("animated"))
            {
                
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
                            showCommentFrame(id, $frame, $comment, offsetLeft, offsetTop);
                        }
                    },
                    timeout: 1000,
                    dataType: 'json',
                    error: function(data) {
                        $frame.html("Could not load comments.");
                        showCommentFrame(id, $frame, $comment, offsetLeft, offsetTop);
                    }
                });
                
            }  

        } );

    } );

    $('html').click( function (e) {

        if ( eventTargetDoesNotInclude(e, '#comment_frame') )
        {
            if (!$frame.hasClass("animated") && $frame.css("display") == "block")
            {
                animate(id, 'fadeOutUp', function() { $frame.css("display", "none"); });
            }
        }
    });
}

bindComments();

function showCommentFrame(id, $frame, $comment, offsetLeft, offsetTop)
{

    var autoOffset = (offsetTop == "auto");

    if (!offsetLeft) offsetLeft = 32;
    if (!offsetTop) offsetTop = -64;

    $frame.css("display", "block");
    $frame.offset({ left: $comment.offset().left + offsetLeft, top: $comment.offset().top + offsetTop});

    animate(id, 'fadeInDown', null);

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

        animate(id, 'fadeOutUp', function() { $frame.css("display", "none"); });

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