// sharing-progress.js controls everything about the gallery sharing steps

var $sharedImageForm = $("form#addSharedImageForm");

function bindSharingImageForm()
{
    $sharedImageForm.ajaxForm({
        beforeSubmit:  function () {
            $sharedImageForm.find(".errors").text("");  
            $sharedImageForm.find('input[type="submit"]').attr("disabled", "disabled");
        },
        success: function (data) {
            if (data.success)
            {
                if (data.refresh)
                {
                    location.reload(true);
                }
            } else {
                appendErrors(data.errors, $sharedImageForm, ".errors");
            }

            $sharedImageForm.find('input[type="submit"]').attr("disabled", false);
        },
        error: function (data) {
            $sharedImageForm.find(".errors").append("Could not share image, try again?");
            $sharedImageForm.find('input[type="submit"]').attr("disabled", false);
        }
    });
}

bindSharingImageForm();


function bindPageResize()
{
    updateProgressBars();
    $(window).resize( updateLearnGrid );
}

function updateLearnGrid()
{
    $(".shared-image-holder").each( function () {
        $(this).css("height", $(this).css("width"))
    });

    resizeLightboxImage();
}

bindPageResize();
updateLearnGrid();

var sharingLightboxId = "#sharing_lightbox";
var $sharingLightbox = $(sharingLightboxId);

$(".js-close-lightbox").click( function(e) {
    hideLightbox();
});

$('html').click( function (e) {

    if ( eventTargetDoesNotInclude(e, sharingLightboxId) && eventTargetDoesNotInclude(e, "#comment_frame") )
    {
        if (!$sharingLightbox.hasClass("animated") && $sharingLightbox.css("display") == "block")
        {
            hideLightbox();
        }
    }
});

function hideLightbox()
{
    animate("#sharing_lightbox", 'fadeOutUp', function () {
        $("#sharing_lightbox").css("display", "none");
    });

    animate("#sharing_lightbox_overlay", 'fadeOutUp', function () {
        $("#sharing_lightbox_overlay").css("display", "none");
    });
}

var $currentLightboxSource;

$(".sharing-step img.lazy").click(function () {

    showLightbox($(this));
    animate("#sharing_lightbox_overlay", 'fadeInDown', null);

});

function showLightbox($source)
{

    $currentLightboxSource = $source;

    $("#sharing_lightbox").css("display", "block");
    $("#sharing_lightbox_overlay").css("display", "block");

    $("#sharing_lightbox img").attr("src", $source.attr("src"));
    $("#sharing_lightbox .download-link").attr("href", $source.attr("src"));
    $("#sharing_lightbox").attr("data-id", $source.attr("data-id"));
    $("#sharing_lightbox .description p").text($source.attr("data-description"));

    animate("#sharing_lightbox", 'fadeInDown', null);

    resizeLightboxImage();
}

$("#shared_image_shared_image").change( function (e) {

    // Only allow files less than 2Mb in size
    if (this.files[0].size/1048576 > 2)
    {
        $sharedImageForm.find(".errors").append("This file is too large (bigger than 2MB), try compressing or resizing it.");
    } else {
        $sharedImageForm.ajaxSubmit(
        {
            url: '/upload-image/',
            type: 'post',
            beforeSubmit:  function () {
                $sharedImageForm.find(".errors").text("");  
                $sharedImageForm.find('input[type="submit"]').attr("disabled", "disabled");
            },
            success: function (data) {

                if (data.success)
                {
                    $("#shared_image_url").val(data.file);
                    $("#shared_image_preview").attr("src", data.file);
                } else {
                    appendErrors(data.errors, $sharedImageForm, ".errors");
                }

                $sharedImageForm.find('input[type="submit"]').attr("disabled", false);
            },
            error: function (data) {
                $sharedImageForm.find(".errors").append("Could not share image, try again?");
                $sharedImageForm.find('input[type="submit"]').attr("disabled", false);
            }
        }
    );
    }

    
});

function resizeLightboxImage()
{
    $("#sharing_lightbox img").attr("style", null);

    if ($("#sharing_lightbox img").height() > $("#sharing_lightbox .image-frame").height() )
    {
        var ratio = $("#sharing_lightbox .image-frame").height() / $("#sharing_lightbox img").height();

        $("#sharing_lightbox img").height( $("#sharing_lightbox .image-frame").height() );
        $("#sharing_lightbox img").width( $("#sharing_lightbox img").width() * ratio );
    }

}

document.onkeydown = function(evt) {
    evt = evt || window.event;

    // Ensure we only handle printable keys
    var charCode = typeof evt.which == "number" ? evt.which : evt.keyCode;

    if ($("#sharing_lightbox").is(':visible'))
    {
        if (charCode == 37)
        {
            showPrevImage();
        }

        if (charCode == 39)
        {
            showNextImage();
        }
    }
};

function showNextImage()
{
    showLightbox($currentLightboxSource.parent().parent().next().find(".shared-image-holder img"));
}

function showPrevImage()
{
    showLightbox($currentLightboxSource.parent().parent().prev().find(".shared-image-holder img"));
}

