$( function() {

    FastClick.attach(document.body);

    if (defined('Select2'))
    {
        $(".js-select2").select2();
    }

});
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
}
boostrapMods();
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
function bindEpicEditorFields()
{
    if (defined('EpicEditor') && $("#epiceditor-target").length > 0) {

        var opts = {
            textarea: 'epiceditor-target',
            basePath: '/javascripts/epiceditor/',
            clientSideStorage: true,
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

        var editor = new EpicEditor(opts).load();

        $("#epiceditor-target").parent().hide();

    }
}

bindEpicEditorFields();
function setUpBannerImage()
{
    $(".banner-image").each( function() {
        var $this = $(this);

        if ($this.attr("data-background") && $this.attr("data-background") != "")
        {
            $this.css("background-image", "url(" + $this.attr("data-background") + ")");
        }
    });
}

setUpBannerImage();
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
                    $frame.find(".errors").append(data.errors[i]);
                    animate(".errors", "fadeInUp");
                }
            }

            $sharedImageForm.find('input[type="submit"]').attr("disabled", false);
        },
        error: function (data) {
            $frame.find(".errors").append("Could not share image, try again?");
            $sharedImageForm.find('input[type="submit"]').attr("disabled", false);
        }
    });
}

bindSharingImageForm();
function bindSlugFields()
{
    $(".js-slug").keyup( function() {

        var targetId = "#" + $(this).attr("data-object") + "_" + $(this).attr("data-target");

        $(targetId).val( convertToSlug( $(this).val() ) );

    });
}

bindSlugFields();
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
                console.log(data);
                $frame.find(".file").html("<a href='" + data.file + "'>View File</a>&nbsp;<a class='js-copy-link' href='" + data.file + "'>Get Link</a>");

                $frame.find(".js-copy-link").click(function (e) {
                    e.preventDefault();

                    window.prompt("Copy to clipboard: Ctrl/Cmd+C, Enter", $(this).attr("href"));
                });
            } else {
                for (var i in data.errors)
                {
                    $frame.find(".errors").append(data.errors[i]);
                    animate(".errors", "fadeInUp");
                }
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

    if ($(element_ID).attr("data-timeout-id"))
    {
        window.clearTimeout($(element_ID).attr("data-timeout-id"));
    }

    $(element_ID).addClass(animation);
    $(element_ID).addClass("animated");

    var timeoutId = window.setTimeout( function () {

        $(element_ID).removeClass(animation);
        $(element_ID).removeClass("animated");

        if (completeCallback != null)
        {
            completeCallback();
        }

    }, 2000);

    $(element_ID).attr("data-timeout-id", timeoutId);

    $(element_ID).off();
    $(element_ID).one("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", 
        function() {
            $(element_ID).removeClass(animation);
            $(element_ID).removeClass("animated");

            if (completeCallback != null)
            {
                completeCallback();
            }
        }
    );
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

function convertToSlug(Text)
{
    return Text
        .toLowerCase()
        .replace(/[^\w ]+/g,'')
        .replace(/ +/g,'-');
}