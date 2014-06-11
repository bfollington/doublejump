// base.js binds UI stuff

$( function() {

    //FastClick.attach(document.body);

    if (defined('Select2'))
    {
        $(".js-select2").select2();
    }

    //Only if we are on the appropriate page, need to used defined? util
    if (jQuery().lazyload)
    {
        $("img.lazy").lazyload(
        {
            threshold : 200
        });
    }

    $(".step-body a[rel='definition']").each( function() {

        $(this).html($(this).html() + ' <i class="fa fa-book"></i>');

        if ( typeof $(this).attr("title") == "undefined")
        {
            $(this).attr("title", "Show Definition");
        }

        $(this).tooltip();

    });

    $(".step-body .comment a").tooltip();

    $(".step-body a[href*='http']").each( function() {

        $(this).html($(this).html() + ' <i class="fa fa-external-link"></i>');

        if ( typeof $(this).attr("title") == "undefined")
        {
            $(this).attr("title", $(this).attr("href"));
        }

        $(this).attr("target", "new");

        $(this).tooltip();

    });

});
// bootstrap-mod.js alters some bootstrap UI animations

function boostrapMods()
{
    $('[rel=tooltip]').tooltip();
    $('[rel=popover]').popover();
    $('[rel=popover]').click( function (e) { e.preventDefault(); } );
    $('[rel=popover][data-trigger=hover]').off("click");

    // ADD SLIDEDOWN ANIMATION TO DROPDOWN //
    $('.dropdown').on('show.bs.dropdown', function(e){
        $(this).find('.dropdown-menu').first().stop(true, true).slideDown(100);
    });

    // ADD SLIDEUP ANIMATION TO DROPDOWN //
    $('.dropdown').on('hide.bs.dropdown', function(e){
        $(this).find('.dropdown-menu').first().stop(true, true).slideUp(100);
    });

    $(".dropdown-toggle").click( function(e) {
        e.preventDefault();
    });
}
boostrapMods();
// comments.js powers the comment frame for articles and images

function bindComments()
{

    var id = "#comment_frame";
    var $frame = $(id);

    $(".step-body .comment, #sharing_lightbox .comment").each( function() {

        var $comment = $(this);
        var $parent = $(this).parent().parent().parent().parent();

        if ($parent.attr("id") != "sharing_lightbox") $(this).html(getTemplate("_comment_icon"));

        $(this).find('a').on("touchstart, click", function (e) { 

            e.preventDefault();

            stopEventPropagating(e);

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
                            showCommentFrame(id, $frame, $comment, offsetLeft, offsetTop);
                        }

                        $comment.children().last().remove();
                    },
                    timeout: 3000,
                    dataType: 'json',
                    error: function(data) {
                        $frame.html("Could not load comments.");
                        showCommentFrame(id, $frame, $comment, offsetLeft, offsetTop);
                        $comment.children().last().remove();
                    }
                });
                
            }  

        } );

    } );

    $('html').on( "touchstart, click", function (e) {

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

    if (findBootstrapEnvironment() == "ExtraSmall")
    {
        // Centre the display on mobiles
        $frame.offset({ left: getViewportWidth() / 2 - $frame.outerWidth() / 2, top: $comment.offset().top + offsetTop});
    } else {

        // Stop comments panel sticking off the right side of the display
        if ($comment.offset().left + offsetLeft + $frame.outerWidth() >= getViewportWidth())
        {
            $frame.offset({ left: getViewportWidth() - $frame.outerWidth() - 10, top: $comment.offset().top + offsetTop});
        } else {
            // Just display it normally
            $frame.offset({ left: $comment.offset().left + offsetLeft, top: $comment.offset().top + offsetTop});
        }

        
    }

    

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
// definitions.js handle definition lookups

function bindDefinitions()
{
    $("a[rel='definition']").click( function(e) {
        var $definition = $(this);

        e.preventDefault();

        var query = $(this).attr("data-query");

        $definition.after(loadingIndicator);

        $.ajax({
            url: "/definitions/define/" + query,
            success: function (data) { 
                if (data != "null" && data != null)
                {
                    $(".step-body .js-inserted-definition").remove();

                    var template = format(
                                        getTemplate("_inserted_definition"), 
                                        {
                                            "definition-title": data.title,
                                            "definition-body": marked(data.body),
                                            "definition-id": marked(data._id)
                                        }
                                    );

                    $definition.parent().after(template);
                    animate($definition.parent().next(), "fadeInUp");

                    $(".js-close-inserted-definition").click( function(e) {
                        e.preventDefault();

                        animate($(this).parent(), "fadeOutDown", function($el) { $el.remove(); });
                    });

                }

                $definition.next().remove();
            },
            timeout: 3000,
            dataType: 'json',
            error: function(data) {
                $definition.next().remove();
                console.log("Could not load definition.");
            }
        });
    });

    $(".js-insert-definition").click( function(e) {
        e.preventDefault();

        var html = '{definition{TITLE, TERM}}';
        prompt("Macro:", html);

        editor.focus();
    });

    $(".js-insert-inline-definition").click( function(e) {
        e.preventDefault();

        var html = '{inline-definition{TERM}}';
        prompt("Macro:", html);

        editor.focus();
    });
}

bindDefinitions();
// epiceditor-config.js configures the epic editor backend fields

var editor;

function bindEpicEditorFields()
{
    if (defined('EpicEditor') && $("#epiceditor-target").length > 0) {

        var opts = {
            textarea: 'epiceditor-target',
            basePath: '/javascripts/epiceditor/',
            clientSideStorage: false,
            localStorageName: 'epiceditor',
            useNativeFullscreen: true,
            parser: marked,
            file: {
                name: 'epiceditor',
                defaultContent: '',
                autoSave: 100
            },
            theme: {
                base: 'themes/base/epiceditor.css',
                preview: 'themes/preview/github.css',
                editor: 'themes/editor/epic-dark.css'
            },
            focusOnLoad: false,
            string: {
                togglePreview: 'Toggle Preview Mode',
                toggleEdit: 'Toggle Edit Mode',
                toggleFullscreen: 'Enter Fullscreen'
            },
            autogrow: false
        } 

        editor = new EpicEditor(opts).load();

        $("#epiceditor-target").parent().hide();

    }
}

bindEpicEditorFields();
// form-util.js provides form handling abstractions

function appendErrors(errorsData, $form, errorsSelector)
{
    for (var i in errorsData)
    {
        if (Array.isArray(errorsData[i]))
        {
            for (var j = 0; j < errorsData[i].length; j++)
            {
                $form.find(errorsSelector).append(errorsData[i][j]);
                $form.find(errorsSelector).append("<br>");
            }
        } else {
            $form.find(errorsSelector).append(errorsData[i]);
            $form.find(errorsSelector).append("<br>");
        }
        
        animate(errorsSelector, "fadeInUp");
    }
}
function createHideableRegions()
{
    $(".hideable-inner").each( function () {
        $(this).find(".content").hide();
    });

    $(".js-toggle-hideable").click( function(e) {
        e.preventDefault();

        var content = $(this).parent().find(".content");

        if (isVisible(content))
        {
            $(this).text("Expand");
            animateElement( content, "fadeOutDown", function ($elem) { $elem.hide(); } );
        } else {
            $(this).text("Hide");
            content.css("display", "block");
            animateElement( content, "fadeInUp" );
        }

        
    });
}

createHideableRegions();

function bindInsertRegionButton()
{
    $(".js-insert-hideable").click( function(e) {
        e.preventDefault();

        var html = '{hideable{TITLE, CONTENT}}';
        prompt("Macro:", html);

        editor.focus();
    });
}

bindInsertRegionButton();
// learn.js modifies the learn page layout to inject images etc.

function setUpBannerImage()
{
    $(".banner-image").each( function() {
        var $this = $(this);

        var bg = $this.attr("data-background");

        if (bg && bg != "" && bg[0] != '#')
        {
            $this.css("background-image", "url(" + bg + ")");
        } else if (bg && bg != "")
        {
            $this.css("background-color", bg);
        }
    });

    if (jQuery().lazyload)
    {
        $(".step-body img").lazyload(
        {
            threshold : 200,
            load: lazyLoadHandler
        });
    }
    

    
}

setUpBannerImage();

function lazyLoadHandler()
{
    if (!$(this).attr("data-zoominit"))
    {
        $(this)
        .attr("data-zoominit", true)
        .wrap('<div class="zoom-wrapper" style="width:' + $(this).outerWidth() + 'px;"></div>')
        .parent()
        .zoom({ on:'mouseover', magnify: 1.5 });
    }

    //$(".zoom-wrapper").css("overflow", "visible");
}
var loadingIndicator = '<div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>';
// progress-bar.js powers the progress bar during a lesson

function updateProgressBars()
{
    $(".progress-list-wrapper .progress").each(function() { 

        var
        $this = $(this),
        $parent = $(this).parent(),
        $first = $parent.find("ul.progress-list li:first a"),
        $last = $parent.find("ul.progress-list li.current-step a");

        $(this).css("width", $last.offset().left - $first.offset().left); 
        $(this).css("left", $first.position().left + 2); 
        $(this).css("top", $first.position().top); 

    } );   
}

function bindProgressBarResize()
{
    updateProgressBars();
    $(window).resize( updateProgressBars );
}

bindProgressBarResize();
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


// slug-fields.js powers slugifying and lower-casing of fields into another field

function bindSlugFields()
{
    $(".js-slug").keyup( function() {

        var targetId = "#" + $(this).attr("data-object") + "_" + $(this).attr("data-target");

        $(targetId).val( convertToSlug( $(this).val() ) );

    });
}

bindSlugFields();

function bindLowercaseFields()
{
    $(".js-lowercase").keyup( function() {

        var targetId = "#" + $(this).attr("data-object") + "_" + $(this).attr("data-target");

        $(targetId).val( convertToLowercase( $(this).val() ) );

    });
}

bindLowercaseFields();
// sortable-list.js powers the re-orderable lists for creating steps, lessons, etc.

function bindSortableLists()
{

    if (jQuery().sortable)
    {

        // Don't double up our event handlers
        $(".js-sortable").off();    
        $(".js-sortable-delete-link").off();    
        $(".js-sortable-add-new").off();    


        // Set up the list
        $(".js-sortable").sortable();


        // Bind our delete links
        $(".js-sortable-delete-link").bind('click', function(e) {
            e.preventDefault();
            $(this).parent().remove();
        });

        // Add a new row to the list
        $(".js-sortable-add-new").click( function(e) {



            var $readSelectionFrom = $( $(this).attr("data-read-selection-from") ),
                hiddenField = $(this).attr("data-hidden-field-name"),
                $targetList = $( $(this).attr("data-target-list") );

            e.preventDefault();

            $targetList.append( format(
                                        getTemplate("_lesson_list_entry"), 
                                        {
                                            "item-text": $readSelectionFrom.find('option:selected').text(),
                                            "field-name": hiddenField,
                                            "field-value": $readSelectionFrom.val(),
                                        }
                                    )
                                );

            bindSortableLists();
        });

    }
}

bindSortableLists();
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
                animate(id, 'fadeOutUp', function() { $frame.css("display", "none"); });
            }
        }
    });
}
bindUpload();

function showUploadFrame(id, $frame)
{
    $frame.css("display", "block");
    $frame.offset({ left: $(".js-upload-link").offset().left, top: $(".js-upload-link").offset().top + 40});
    animate(id, 'fadeInDown', null);

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
/**
 * Calls an Animate.css animation on the provided selector
 * @param  {[type]} element_ID [description]
 * @param  {[type]} animation  [description]
 */
function animate(element_ID, animation, completeCallback) {

    animateElement($(element_ID), animation, completeCallback);

}

function animateElement($element, animation, completeCallback) {

    if (supportsTransitions())
    {
        if ($element.attr("data-timeout-id"))
        {
            window.clearTimeout($element.attr("data-timeout-id"));
        }

        $element.addClass(animation);
        $element.addClass("animated");

        var timeoutId = window.setTimeout( function () {

            $element.removeClass(animation);
            $element.removeClass("animated");

            if (completeCallback != null)
            {
                completeCallback($element);
            }

        }, 2000);

        $element.attr("data-timeout-id", timeoutId);

        $element.off();
        $element.one("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", 
            function() {
                $element.removeClass(animation);
                $element.removeClass("animated");

                if (completeCallback != null)
                {
                    completeCallback($element);
                }
            }
        );
    } else {
        completeCallback($element);
    }


}
function stopEventPropagating(e)
{
    if (!e)
      e = window.event;

    //IE9 & Other Browsers
    if (e.stopPropagation) {
      e.stopPropagation();
    }
    //IE8 and Lower
    else {
      e.cancelBubble = true;
    }
}

function eventTargetDoesNotInclude(event, element)
{
    return ( $(event.target).closest(element).length == 0 );
}
function getTemplate(name)
{
    return $("#" + name + "_template").html();
}

function format(html, variables)
{
    for (var k in variables)
    {
        var re = new RegExp("{{#" + k + "}}", 'g');

        html = html.replace(re, variables[k]);
    }

    return html;
}
function defined(variable)
{
    return typeof window[variable] != "undefined";
}

function convertToSlug(text)
{
    return text
        .toLowerCase()
        .replace(/[^\w ]+/g,'')
        .replace(/ +/g,'-');
}

function convertToLowercase(text)
{
    return text.toLowerCase();
}

function supportsTransitions() {
    var b = document.body || document.documentElement,
        s = b.style,
        p = 'transition';

    if (typeof s[p] == 'string') { return true; }

    // Tests for vendor specific prop
    var v = ['Moz', 'webkit', 'Webkit', 'Khtml', 'O', 'ms'];
    p = p.charAt(0).toUpperCase() + p.substr(1);

    for (var i=0; i<v.length; i++) {
        if (typeof s[v[i] + p] == 'string') { return true; }
    }

    return false;
}

function isVisible($elem)
{
    if ($elem.css("display") != "none" && $elem.css("display") != "hidden")
    {
        return true;
    } else {
        return false;
    }
}

function insertTextAtCursor(text) {
    var sel, range, html;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();
            range.insertNode( document.createTextNode(text) );
        }
    } else if (document.selection && document.selection.createRange) {
        document.selection.createRange().text = text;
    }
}

function saveSelection() {
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            return sel.getRangeAt(0);
        }
    } else if (document.selection && document.selection.createRange) {
        return document.selection.createRange();
    }
    return null;
}

function restoreSelection(range) {
    if (range) {
        if (window.getSelection) {
            sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        } else if (document.selection && range.select) {
            range.select();
        }
    }
}

function findBootstrapEnvironment() {
    var envs = ["ExtraSmall", "Small", "Medium", "Large"];
    var envValues = ["xs", "sm", "md", "lg"];

    var $el = $('<div>');
    $el.appendTo($('body'));

    for (var i = envValues.length - 1; i >= 0; i--) {
        var envVal = envValues[i];

        $el.addClass('hidden-'+envVal);
        if ($el.is(':hidden')) {
            $el.remove();
            return envs[i]
        }
    };
}

function getViewportWidth()
{
    return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
}

function getViewportHeight()
{
    return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
}