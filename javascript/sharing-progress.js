// sharing-progress.js controls everything about the gallery sharing steps

var lightbox = new function()
{
    var $sharedImageForm = $("form#addSharedImageForm");
    var self = this;

    self.bindSharingImageForm = function()
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

    self.bindImageClick = function ()
    {
        $("img.shared-image").lazyload(
        {
            threshold : 200,
            load: learn.lazyLoadHandler
        });
    }

    self.bindPageResize = function()
    {
        self.updateLearnGrid();
        $(window).resize( self.updateLearnGrid );
    }

    self.updateLearnGrid = function()
    {
        $(".shared-image-holder").each( function () {
            $(this).css("height", $(this).css("width"))
        });
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



}

lightbox.bindImageClick();
lightbox.bindSharingImageForm();
lightbox.bindPageResize();
