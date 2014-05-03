function bindSharingImageForm()
{
    var $sharedImageForm = $("form#addSharedImageForm");

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
                for (var i in data.errors)
                {
                    $sharedImageForm.find(".errors").append(data.errors[i]);
                    animate(".errors", "fadeInUp");
                }
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

$("img.lazy").lazyload();

