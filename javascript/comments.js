function bindComments()
{

    var id = "#comment_frame";
    var $frame = $(id);

    $(".step-body .comment").each( function() {

        var $comment = $(this);

        $(this).html(getTemplate("_comment_icon"));

        $(this).find('a').click( function (e) { 

            e.preventDefault();

            stopEventPropagating(e);

            // Do not interrupt a transition
            if (!$("#comment_frame").hasClass("animated"))
            {

                var currentStep = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);
                currentStep = currentStep.split("#")[0];
                currentStep = currentStep.split("?")[0];

                $.ajax({
                    url: "/comments/get/" + currentStep + "/" + $(this).parent().attr("data-group"),
                    success: function (data) { 
                        if (data.success)
                        {
                            $frame.html(data.html);
                            showCommentFrame(id, $frame, $comment);
                        }
                    },
                    timeout: 1000,
                    dataType: 'json',
                    error: function(data) {
                        $frame.html("Could not load comments.");
                        showCommentFrame(id, $frame, $comment);
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

function showCommentFrame(id, $frame, $comment)
{

    $frame.css("display", "block");
    $frame.offset({ left: $comment.offset().left + 32, top: $comment.offset().top - 64});

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
                for (var i in data.errors)
                {
                    $frame.find(".errors").append(data.errors[i]);
                    animate(".errors", "fadeInUp");
                }
            }

            $("form#Comment").find('input[type="submit"]').attr("disabled", false);
        },
        error: function (data) {
            $frame.find(".errors").append("Could not post comment, try again?");
            $("form#Comment").find('input[type="submit"]').attr("disabled", false);
        }
    });

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