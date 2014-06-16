// base.js binds UI stuff

$( function() {

    //FastClick.attach(document.body);

    $("html").first().removeClass("no-js");

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

    //Include mathjax if needed
    if ($("div:contains('$$')").length > 0 || $("div:contains('\\(')").length > 0)
    {
        (function () {
          var head = document.getElementsByTagName("head")[0], script;
          script = document.createElement("script");
          script.type = "text/x-mathjax-config";
          script[(window.opera ? "innerHTML" : "text")] =
            "MathJax.Hub.Config({\n" +
            "  jax: ['input/TeX','output/SVG']" +
            "});"
          head.appendChild(script);
          script = document.createElement("script");
          script.type = "text/javascript";
          script.src  = "http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML";
          head.appendChild(script);
        })();
    }

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

    $(".js-insert-inline-tex").click( function(e) {
        e.preventDefault();

        var html = "\\\\( \\\\)";
        prompt("Tex:", html);

        editor.focus();
    });

    $(".js-insert-block-tex").click( function(e) {
        e.preventDefault();

        var html = "$$ $$";
        prompt("Tex:", html);

        editor.focus();
    });
}

bindDefinitions();
// epiceditor-config.js configures the epic editor backend fields

var editor;

function bindEpicEditorFields()
{
    if (defined('EpicEditor') && $("#epiceditor-target").length > 0) {

        console.log(escapeHtmlEntities( $("#epiceditor-target").text() ));

        $("#epiceditor-target").text( escapeHtmlEntities( $("#epiceditor-target").text() ) );

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

    $("[data-bg]").each( function() {
        $(this).css("background-color", $(this).attr("data-bg"));
    });

    $("[data-colour]").each( function() {
        $(this).css("color", $(this).attr("data-colour"));
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

    if ( $(".course-progress-node").length > 0 )
    {
        var nodes = getVerticalProgressPoints();

        var
        $first = nodes.first,
        $upto = nodes.upto,
        $last = nodes.last;
        nodeWidth = $first.outerWidth() - 3;

        var $doneBar = $(".vertical-progress-done");
        $doneBar.css("height", $upto.offset().top - $first.offset().top);
        $doneBar.css("left", $first.offset().left + nodeWidth / 2);
        $doneBar.css("top", $first.offset().top + nodeWidth / 2);

        var $toDoBar = $(".vertical-progress-todo");
        $toDoBar.css("height", $last.offset().top - $upto.offset().top);
        $toDoBar.css("left", $upto.offset().left + nodeWidth / 2);
        $toDoBar.css("top", $upto.offset().top + nodeWidth / 2);
    }


}

function getVerticalProgressPoints ()
{
    var
    $first = $(".course-progress-node.first"),
    $upto = $(".course-progress-node.done:last"),
    $last = $(".course-progress-node.last");

    if ($upto.length == 0)
    {
        $upto = $first;
    }

    return {"first" : $first, "upto": $upto, "last": $last};
}

function initVerticalBars()
{
    if ( $(".course-progress-node").length > 0 )
    {
        $("body").prepend("<div class='vertical-progress-done'></div>");
        $("body").prepend("<div class='vertical-progress-todo'></div>");

        var $selector = $(".course-progress-node").not(".done").first().parent().next();

        var href = $selector.find("a").attr("href");

        $selector.find(".box").prepend("<a href='" + href + "' class='button create-button float-right lets-go'>Let's Go!</div>");
    } 
}

function bindProgressBarResize()
{
    updateProgressBars();
    $(window).resize( updateProgressBars );
}

bindProgressBarResize();
initVerticalBars();
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

    animate("#sharing_lightbox_overlay", 'fadeOutUpHalfOpacity', function () {
        $("#sharing_lightbox_overlay").css("display", "none");
    });
}

var $currentLightboxSource;

$("img.lazy.shared-image").click(function () {

    console.log("test");
    showLightbox($(this));
    animate("#sharing_lightbox_overlay", 'fadeInDownHalfOpacity', null);

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
    $("#sharing_lightbox img").off();
    $("#sharing_lightbox img").load( resizeLightboxImage )
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
    var $next = $currentLightboxSource.parent().parent().next().find(".shared-image-holder img");

    if ($next.length > 0) showLightbox($next);
}

function showPrevImage()
{
    var $prev = $currentLightboxSource.parent().parent().prev().find(".shared-image-holder img");

    if ($prev.length > 0) showLightbox($prev);
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

function escapeHtmlEntities (text) {
    return text.replace(/[\u00A0-\u2666<>\&]/g, function(c) {

        // all HTML4 entities as defined here: http://www.w3.org/TR/html4/sgml/entities.html
        // added: amp, lt, gt, quot and apos
        var entityTable = {
            34 : 'quot', 
            38 : 'amp', 
            39 : 'apos', 
            60 : 'lt', 
            62 : 'gt', 
            160 : 'nbsp', 
            161 : 'iexcl', 
            162 : 'cent', 
            163 : 'pound', 
            164 : 'curren', 
            165 : 'yen', 
            166 : 'brvbar', 
            167 : 'sect', 
            168 : 'uml', 
            169 : 'copy', 
            170 : 'ordf', 
            171 : 'laquo', 
            172 : 'not', 
            173 : 'shy', 
            174 : 'reg', 
            175 : 'macr', 
            176 : 'deg', 
            177 : 'plusmn', 
            178 : 'sup2', 
            179 : 'sup3', 
            180 : 'acute', 
            181 : 'micro', 
            182 : 'para', 
            183 : 'middot', 
            184 : 'cedil', 
            185 : 'sup1', 
            186 : 'ordm', 
            187 : 'raquo', 
            188 : 'frac14', 
            189 : 'frac12', 
            190 : 'frac34', 
            191 : 'iquest', 
            192 : 'Agrave', 
            193 : 'Aacute', 
            194 : 'Acirc', 
            195 : 'Atilde', 
            196 : 'Auml', 
            197 : 'Aring', 
            198 : 'AElig', 
            199 : 'Ccedil', 
            200 : 'Egrave', 
            201 : 'Eacute', 
            202 : 'Ecirc', 
            203 : 'Euml', 
            204 : 'Igrave', 
            205 : 'Iacute', 
            206 : 'Icirc', 
            207 : 'Iuml', 
            208 : 'ETH', 
            209 : 'Ntilde', 
            210 : 'Ograve', 
            211 : 'Oacute', 
            212 : 'Ocirc', 
            213 : 'Otilde', 
            214 : 'Ouml', 
            215 : 'times', 
            216 : 'Oslash', 
            217 : 'Ugrave', 
            218 : 'Uacute', 
            219 : 'Ucirc', 
            220 : 'Uuml', 
            221 : 'Yacute', 
            222 : 'THORN', 
            223 : 'szlig', 
            224 : 'agrave', 
            225 : 'aacute', 
            226 : 'acirc', 
            227 : 'atilde', 
            228 : 'auml', 
            229 : 'aring', 
            230 : 'aelig', 
            231 : 'ccedil', 
            232 : 'egrave', 
            233 : 'eacute', 
            234 : 'ecirc', 
            235 : 'euml', 
            236 : 'igrave', 
            237 : 'iacute', 
            238 : 'icirc', 
            239 : 'iuml', 
            240 : 'eth', 
            241 : 'ntilde', 
            242 : 'ograve', 
            243 : 'oacute', 
            244 : 'ocirc', 
            245 : 'otilde', 
            246 : 'ouml', 
            247 : 'divide', 
            248 : 'oslash', 
            249 : 'ugrave', 
            250 : 'uacute', 
            251 : 'ucirc', 
            252 : 'uuml', 
            253 : 'yacute', 
            254 : 'thorn', 
            255 : 'yuml', 
            402 : 'fnof', 
            913 : 'Alpha', 
            914 : 'Beta', 
            915 : 'Gamma', 
            916 : 'Delta', 
            917 : 'Epsilon', 
            918 : 'Zeta', 
            919 : 'Eta', 
            920 : 'Theta', 
            921 : 'Iota', 
            922 : 'Kappa', 
            923 : 'Lambda', 
            924 : 'Mu', 
            925 : 'Nu', 
            926 : 'Xi', 
            927 : 'Omicron', 
            928 : 'Pi', 
            929 : 'Rho', 
            931 : 'Sigma', 
            932 : 'Tau', 
            933 : 'Upsilon', 
            934 : 'Phi', 
            935 : 'Chi', 
            936 : 'Psi', 
            937 : 'Omega', 
            945 : 'alpha', 
            946 : 'beta', 
            947 : 'gamma', 
            948 : 'delta', 
            949 : 'epsilon', 
            950 : 'zeta', 
            951 : 'eta', 
            952 : 'theta', 
            953 : 'iota', 
            954 : 'kappa', 
            955 : 'lambda', 
            956 : 'mu', 
            957 : 'nu', 
            958 : 'xi', 
            959 : 'omicron', 
            960 : 'pi', 
            961 : 'rho', 
            962 : 'sigmaf', 
            963 : 'sigma', 
            964 : 'tau', 
            965 : 'upsilon', 
            966 : 'phi', 
            967 : 'chi', 
            968 : 'psi', 
            969 : 'omega', 
            977 : 'thetasym', 
            978 : 'upsih', 
            982 : 'piv', 
            8226 : 'bull', 
            8230 : 'hellip', 
            8242 : 'prime', 
            8243 : 'Prime', 
            8254 : 'oline', 
            8260 : 'frasl', 
            8472 : 'weierp', 
            8465 : 'image', 
            8476 : 'real', 
            8482 : 'trade', 
            8501 : 'alefsym', 
            8592 : 'larr', 
            8593 : 'uarr', 
            8594 : 'rarr', 
            8595 : 'darr', 
            8596 : 'harr', 
            8629 : 'crarr', 
            8656 : 'lArr', 
            8657 : 'uArr', 
            8658 : 'rArr', 
            8659 : 'dArr', 
            8660 : 'hArr', 
            8704 : 'forall', 
            8706 : 'part', 
            8707 : 'exist', 
            8709 : 'empty', 
            8711 : 'nabla', 
            8712 : 'isin', 
            8713 : 'notin', 
            8715 : 'ni', 
            8719 : 'prod', 
            8721 : 'sum', 
            8722 : 'minus', 
            8727 : 'lowast', 
            8730 : 'radic', 
            8733 : 'prop', 
            8734 : 'infin', 
            8736 : 'ang', 
            8743 : 'and', 
            8744 : 'or', 
            8745 : 'cap', 
            8746 : 'cup', 
            8747 : 'int', 
            8756 : 'there4', 
            8764 : 'sim', 
            8773 : 'cong', 
            8776 : 'asymp', 
            8800 : 'ne', 
            8801 : 'equiv', 
            8804 : 'le', 
            8805 : 'ge', 
            8834 : 'sub', 
            8835 : 'sup', 
            8836 : 'nsub', 
            8838 : 'sube', 
            8839 : 'supe', 
            8853 : 'oplus', 
            8855 : 'otimes', 
            8869 : 'perp', 
            8901 : 'sdot', 
            8968 : 'lceil', 
            8969 : 'rceil', 
            8970 : 'lfloor', 
            8971 : 'rfloor', 
            9001 : 'lang', 
            9002 : 'rang', 
            9674 : 'loz', 
            9824 : 'spades', 
            9827 : 'clubs', 
            9829 : 'hearts', 
            9830 : 'diams', 
            338 : 'OElig', 
            339 : 'oelig', 
            352 : 'Scaron', 
            353 : 'scaron', 
            376 : 'Yuml', 
            710 : 'circ', 
            732 : 'tilde', 
            8194 : 'ensp', 
            8195 : 'emsp', 
            8201 : 'thinsp', 
            8204 : 'zwnj', 
            8205 : 'zwj', 
            8206 : 'lrm', 
            8207 : 'rlm', 
            8211 : 'ndash', 
            8212 : 'mdash', 
            8216 : 'lsquo', 
            8217 : 'rsquo', 
            8218 : 'sbquo', 
            8220 : 'ldquo', 
            8221 : 'rdquo', 
            8222 : 'bdquo', 
            8224 : 'dagger', 
            8225 : 'Dagger', 
            8240 : 'permil', 
            8249 : 'lsaquo', 
            8250 : 'rsaquo', 
            8364 : 'euro'
        };


        return '&' + 
        (entityTable[c.charCodeAt(0)] || '#'+c.charCodeAt()) + ';';
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
        $element.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", 
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