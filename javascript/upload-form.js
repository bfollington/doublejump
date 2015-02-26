var animate = require("util/animate-util");

// upload-form.js powers the file uploader available in the backend

function bindUpload()
{

    var id = "#upload_frame";
    var $frame = $(id);

    $(".js-upload-link").click( function (e) {

        e.preventDefault();

        stopEventPropagating(e);

        // Do not interrupt a transition
        if (!$frame.hasClass("animated"))
        {

            $.ajax({
                url: "/upload/",
                success: function (data) {
                    if (data.success)
                    {
                        $frame.html(data.html);
                        showUploadFrame(id, $frame);
                    }
                },
                timeout: 1000,
                dataType: 'json',
                error: function(data) {
                    $frame.html("Could not load upload form.");
                    showUploadFrame(id, $frame);
                }
            });
        }

    } );

    $('html').click( function (e) {

        if ( eventTargetDoesNotInclude(e, '#upload_frame') )
        {
            if (!$frame.hasClass("animated") && $frame.css("display") == "block")
            {
                animate.animate(id, 'fadeOutUp', function() { $frame.css("display", "none"); });
            }
        }
    });
}
bindUpload();

function showUploadFrame(id, $frame)
{
    $frame.css("display", "block");
    $frame.offset({ left: $(".js-upload-link").offset().left, top: $(".js-upload-link").offset().top + 40});
    animate.animate(id, 'fadeInDown', null);

    $("form#Upload").off();

    $("form#Upload").ajaxForm({
        beforeSubmit:  function () {
            $frame.find(".errors").text("");
            $frame.find(".file").text("");
            $("form#Upload").find('input[type="submit"]').attr("disabled", "disabled");
        },
        success: function (data) {
            if (data.success)
            {
                $frame.find(".file").html("<a href='" + data.file + "'>View File</a>&nbsp;<a class='js-copy-link' href='" + data.file + "'>Get Link</a>");

                $frame.find(".js-copy-link").click(function (e) {
                    e.preventDefault();

                    window.prompt("Copy to clipboard: Ctrl/Cmd+C, Enter", $(this).attr("href"));
                });
            } else {
                appendErrors(data.errors, $frame, ".errors");
            }

            $("form#Upload").find('input[type="submit"]').attr("disabled", false);
        },
        error: function (data) {
            $frame.find(".errors").append("Could not post comment, try again?");
            $("form#Upload").find('input[type="submit"]').attr("disabled", false);
        }
    });
}

module.exports = {
    bindUpload: bindUpload,
    showUploadFrame: showUploadFrame
};
