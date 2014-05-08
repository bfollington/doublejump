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
}

bindPageResize();
updateLearnGrid();

var sharingLightboxId = "#sharing_lightbox";
var $sharingLightbox = $(sharingLightboxId);

$(".js-close-lightbox").click( function(e) {
    hideLightbox();
});

$('html').click( function (e) {

    if ( eventTargetDoesNotInclude(e, sharingLightboxId) )
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


//Only if we are on the appropriate page, need to used defined? util
if (jQuery().lazyload)
{
    $("img.lazy").lazyload();
}


$("img.lazy").click(function () {

    $("#sharing_lightbox").css("display", "block");
    $("#sharing_lightbox_overlay").css("display", "block");

    $("#sharing_lightbox img").attr("src", $(this).attr("src"));

    animate("#sharing_lightbox", 'fadeInDown', null);
    animate("#sharing_lightbox_overlay", 'fadeInDown', null);



});

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

                console.log(data);
                if (data.success)
                {
                    $("#shared_image_url").val(data.file);
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

