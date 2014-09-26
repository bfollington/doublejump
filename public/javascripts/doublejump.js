// base.js binds UI stuff and initialises some important bits

var mathjax = false;

$( function() {

    // Remove no-js class to signify that we... uh... have js
    $("html").first().removeClass("no-js");

    // Configure select2 when the plugin is present
    if (defined('Select2'))
    {
        $(".js-select2").select2();
    }

    //Configure lazy loading of images when the plugin is present
    //Only if we are on the appropriate page, need to used defined? util
    if (jQuery().lazyload)
    {
        $("img.lazy").lazyload(
        {
            threshold : 200
        });
    }

    // Add a book icon to every definition link in the body of the step
    $(".step-body a[rel='definition']").each( function() {

        $(this).html($(this).html() + ' <i class="fa fa-book"></i>');

        if ( typeof $(this).attr("title") == "undefined")
        {
            $(this).attr("title", "Show Definition");
        }

        $(this).tooltip();

    });

    // Add tooltips to comment links
    $(".step-body .comment a").tooltip();

    // Add icons to external links
    $(".step-body a[href*='http']").each( function() {

        $(this).html($(this).html() + ' <i class="fa fa-external-link"></i>');

        if ( typeof $(this).attr("title") == "undefined")
        {
            $(this).attr("title", $(this).attr("href").trunc(50));
        }

        $(this).attr("target", "new");

        $(this).tooltip({placement: "top"});

    });

    //Include mathjax if needed
    if ($("div:contains('{\\[')").length > 0 || $("div:contains('\\(')").length > 0)
    {

        mathjax = true;

        (function () {
          var head = document.getElementsByTagName("head")[0], script;
          script = document.createElement("script");
          script.type = "text/x-mathjax-config";
          script[(window.opera ? "innerHTML" : "text")] =
            "MathJax.Hub.Config({\n" +
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

var comments = new function()
{
    var self = this;
    
    self.bindComments = function()
    {

        var id = "#comment_frame";
        var $frame = $(id);

        $(".step-body .comment, .shared-wrapper .comment").each( function() {

            var $comment = $(this);
            // Almost always the column content resides in
            var $parent = $(this).parent().parent().parent().parent();
            // This will be a .hideable-inner in an edge case
            var $otherParent = $(this).parent().parent().parent();
            var $sibling = $(this).prev();

            // Strip comments out of hideable sections, they shouldn't be there in the first place.
            if ($otherParent.is(".hideable-inner"))
            {
                $(this).remove();
                return true;
            }

            var blockElementComments = [];

            if ($(this).closest(".shared-wrapper").length == 0)
            {
                $(this).html( format( getTemplate("_comment_icon"), {"comment-count": $(this).attr("data-count") }) );
            }

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
                                self.showCommentFrame(id, $frame, $comment, offsetLeft, offsetTop);
                            }

                            $comment.children().last().remove();
                        },
                        timeout: 3000,
                        dataType: 'json',
                        error: function(data) {
                            $frame.html("Could not load comments.");
                            self.showCommentFrame(id, $frame, $comment, offsetLeft, offsetTop);
                            $comment.children().last().remove();
                        }
                    });
                    
                }  

            } );

        } );

        // Move comments after text to start of paragraph
        $(".step-body :not(div) + p .comment").each( function () {

            $(this).prependTo($(this).parent());
        });

        var $firstComment = $(".step-body .comment").first();
        $firstComment.prependTo($firstComment.parent());

        // Move comments after divs to be before them instead
        $(".step-body div + p .comment").each( function () {

            $(this).parent().insertBefore($(this).parent().prev());
        });

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

    self.showCommentFrame = function(id, $frame, $comment, offsetLeft, offsetTop)
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
}

comments.bindComments();


// definitions.js handle definition lookups

var definitions = new function()
{
    var self = this;
    self.bindDefinitions = function()
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
                                                "definition-id": data._id
                                            }
                                        );

                        $definition.parent().after(template);
                        animate($definition.parent().next(), "fadeInUp");

                        if (mathjax) MathJax.Hub.Queue(["Typeset", MathJax.Hub, $definition.parent().next()[0]]);

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

            var html = '{definition{"TITLE", "TERM"}}';
            prompt("Macro:", html);

            editor.focus();
        });

        $(".js-insert-inline-definition").click( function(e) {
            e.preventDefault();

            var html = '{inline-definition{"TERM"}}';
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

            var html = "\\\\[ \\\\]";
            prompt("Tex:", html);

            editor.focus();
        });

        $(".js-insert-two-cols").click( function(e) {
            e.preventDefault();

            var html = '{two-columns{"one", "two"}}';
            prompt("Macro:", html);

            editor.focus();
        });

        $(".js-insert-one-col").click( function(e) {
            e.preventDefault();

            var html = '{one-column{"content"}}';
            prompt("Macro:", html);

            editor.focus();
        });
    }
}

definitions.bindDefinitions();


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
            autogrow: true,
            minHeight: 512

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
// hideable-region.js

var hideable = new function()
{
    var self = this;
    self.createHideableRegions = function()
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

    self.bindInsertRegionButton = function()
    {
        $(".js-insert-hideable").click( function(e) {
            e.preventDefault();

            var html = '{hideable{TITLE, CONTENT}}';
            prompt("Macro:", html);

            editor.focus();
        });
    }
}

hideable.createHideableRegions();
hideable.bindInsertRegionButton();


// learn.js modifies the learn page layout to inject images etc.

var learn = new function()
{
    var self = this;
    
    self.setup = function()
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
                load: self.lazyLoadHandler
            });
        } else {
            $(".step-body img").each( function()
            {
                $(this).attr("src", $(this).attr("data-original"));
            });
        }
    }

    // Add the intense viewer to the images
    self.lazyLoadHandler = function()
    {
        $(this).attr("data-caption", $(this).attr("alt"));
        $(this).addClass("plus-cursor");
        Intense( this );
    }
}

learn.setup();
var loadingIndicator = '<div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>';
// notifications.js

var notifications = new function()
{
    var self = this;

    self.bindRemoveLinks = function ()
    {
        $(".remove-notification").click( function (e) {
            e.preventDefault();
            e.stopPropagation();

            var $menu = $( this ).closest(".dropdown-menu");
            console.log($menu);

            var $li = $( this ).closest("li");

            $.postWithCsrf("/notifications/remove/" + $li.attr("data-id"), {}, function (data) {
                if (!data.success)
                {
                    console.error("Notification " + $li.attr("data-id") + " could not be removed.");
                }
            })

            $li.remove();

            // Decrement the number of remaining notifications
            $( ".notification-badge" ).text(parseInt($( ".notification-badge" ).text()) - 1);

            // Remove the whole menu if there are none left
            if ($menu.children().length == 0)
            {
                $menu.remove();
                $( ".notifications" ).remove();
            }
        });
    };
}

notifications.bindRemoveLinks();
// progress-bar.js powers the progress bar during a lesson

var progress = new function()
{
    var self = this;
    self.updateProgressBars = function()
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
            var nodes = self.getVerticalProgressPoints();

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


    self.getVerticalProgressPoints = function()
    {
        var
        $first = $(".course-progress-node.first"),
        $upto = $(".course-progress-node.done:last"),
        $last = $(".course-progress-node:last");

        if ($upto.length == 0)
        {
            $upto = $first;
        }

        return {"first" : $first, "upto": $upto, "last": $last};
    }


    self.initVerticalBars = function()
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

    self.initHorizontalBars = function()
    {
        $(".progress-list-wrapper").prepend("<div class='progress'></div>");
    }

    self.bindProgressBarResize = function()
    {
        self.updateProgressBars();
        window.setTimeout( self.updateProgressBars, 1000 );
        $(window).resize( self.updateProgressBars );

        // If we are running CSS animations, then we need to keep the progress bars up to date
        if (supportsTransitions())
        {
            self.runBarUpdate();    
        }
        
    }

    self.barUpdateCount = 0;

    self.runBarUpdate = function() {
        self.barUpdateCount++;

        // Only update 100 frames of animation
        if (self.barUpdateCount < 100)
        {
            requestAnimationFrame(self.runBarUpdate);
            self.updateProgressBars();
        }
    }
}

progress.initHorizontalBars();
progress.bindProgressBarResize();
progress.initVerticalBars();
var search = new function()
{
    var self = this;
    
    self.searchTerm = "";
    self.categoryFilter = "";

    self.bindDefinitionSearchField = function()
    {

        $(".js-definition-filter").keyup( function() {

            var searchTerm = $(this).val().toLowerCase();

            $(".definition-block").each( function() {
                var
                definitionTerm = $(this).attr("data-definition-name").toLowerCase(),
                show = false;

                if ( definitionTerm.indexOf(searchTerm) >= 0 || searchTerm.indexOf(definitionTerm) >= 0 )
                {
                    show = true;
                }

                if (show)
                {
                    $(this).parent().show();
                } else {
                    $(this).parent().hide();
                }

            });

                
        });

    }

    self.bindCourseSearchField = function()
    {

        $(".js-course-filter").keyup( function() {

            self.searchTerm = $(this).val().toLowerCase();

            self.filterCourses(self.searchTerm, self.categoryFilter);

            
        });

        $(".js-category-tag").click( function() {

            if ($(this).attr("data-selected") != "true")
            {
                self.categoryFilter = $(this).attr("data-category").toLowerCase();

                $(".js-category-tag").each( function() {
                    $(this).css("background-color", $(this).attr("data-bg"));
                    $(this).attr("data-selected", "false");
                });

                $(this).css("background-color", $(this).attr("data-bg-selected"));
                $(this).attr("data-selected", "true");

                
            } else {
                self.categoryFilter = "";
                $(this).css("background-color", $(this).attr("data-bg"));
                $(this).attr("data-selected", "false");
            }

            self.filterCourses(self.searchTerm, self.categoryFilter);

        });

    }

    self.filterCourses = function(searchTerm, categoryFilter)
    {

        $(".course-block").each( function() {
            var
            categoryName = $(this).attr("data-category-name").toLowerCase(),
            courseName = $(this).attr("data-course-name").toLowerCase(),
            show = false;

            if (   courseName.indexOf(searchTerm) >= 0
                || searchTerm.indexOf(courseName) >= 0
                || categoryName.indexOf(searchTerm) >= 0
                || searchTerm.indexOf(categoryName) >= 0)
            {
                show = true;
            }

            if ( categoryName.indexOf(categoryFilter) == -1 )
            {
                show = false;
            }

            if (show)
            {
                $(this).parent().show();
            } else {
                $(this).parent().hide();
            }

        });
    }
}

search.bindCourseSearchField();
search.bindDefinitionSearchField();
// sharing-progress.js controls everything about the gallery sharing steps

var sharing = new function()
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

    self.bindLikeImage = function ()
    {
        $(".likes .like-image").click( function (e) {

            var $me = $(this);
            e.preventDefault();
            $.get( $( this ).attr("href"),
            function (data) {
                if (data && data.success)
                {
                    $me.parent().find(".likes-count").text(data.like_count);
                }
            });

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

sharing.bindImageClick();
sharing.bindSharingImageForm();
sharing.bindPageResize();
sharing.bindLikeImage();

// slug-fields.js powers slugifying and lower-casing of fields into another field

var slug = new function()
{
    var self = this;

    self.bindSlugFields = function()
    {
        $(".js-slug").keyup( function() {

            var targetId = "#" + $(this).attr("data-object") + "_" + $(this).attr("data-target");

            $(targetId).val( convertToSlug( $(this).val() ) );

        });
    }

    

    self.bindLowercaseFields = function()
    {
        $(".js-lowercase").keyup( function() {

            var targetId = "#" + $(this).attr("data-object") + "_" + $(this).attr("data-target");

            $(targetId).val( convertToLowercase( $(this).val() ) );

        });
    }

    
}

slug.bindSlugFields();
slug.bindLowercaseFields();
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
$.postWithCsrf = function (url, data, success)
{
    data[$("meta[name=csrf-param]").attr("content")] = $("meta[name=csrf-token]").attr("content");
    $.post(url, data, success);
};
String.prototype.trunc = String.prototype.trunc ||
    function(n) {
        return this.length > n ? this.substr(0, n - 3)+'...' : this;
    };

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
                $element.trigger("animationOver");

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