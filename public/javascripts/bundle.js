(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// base.js binds UI stuff and initialises some important bits

var mathjax = false;
window.doublejump = window.doublejump || {};

var mixins = require("mixins/mixin_controller"),
    bootstrapMod = require("bootstrap-mod"),
    definitions = require("definitions"),
    hideable = require("hideable-region"),
    learn = require("learn"),
    notifications = require("notifications"),
    jqueryExtend = require("util/_jquery_extend"),
    search = require("search"),
    slug = require("slug-fields"),
    loading = require("loading"),
    util = require("util/_util"),
    twoCols = require("two-cols"),
    underscoreSettings = require("backbone/underscore_settings"),
    uiBinding = require("mixins/ui_binder"),
    comments = require("comments");

$( function() {

    util.init();
    loading();

    // Remove no-js class to signify that we... uh... have js
    $("html").first().removeClass("no-js");

    // Initialise all the individual page controllers for the app
    mixins.intialiseControllers();

    underscoreSettings();

    bootstrapMod();
    jqueryExtend();

    definitions.convertDefinitionLinks();
    definitions.bindDefinitions();

    hideable.createHideableRegions();
    hideable.bindInsertRegionButton();

    search.bindCourseSearchField();
    search.bindDefinitionSearchField();

    twoCols.repositionColumns();

    slug.bindSlugFields();
    slug.bindLowercaseFields();

    learn.setup();

    notifications.bindRemoveLinks();

    uiBinding();

    // comments.bindComments();

    // Configure select2 when the plugin is present
    if ( typeof $.fn.select2 != "undefined" )
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

},{"backbone/underscore_settings":9,"bootstrap-mod":10,"comments":11,"definitions":12,"hideable-region":13,"learn":14,"loading":15,"mixins/mixin_controller":22,"mixins/ui_binder":28,"notifications":29,"search":33,"slug-fields":35,"two-cols":37,"util/_jquery_extend":39,"util/_util":40}],2:[function(require,module,exports){
var Pillar = require("pillar/pillar");
var sortable = require("sortable-list");
var aceUtil = require("aceUtil");

var ComposeStepView = Pillar.View.extend({
    init: function(opts)
    {
        console.log("INIT");
        this.rebuildIdList();
        this.countSubmits = 0;
        sortable.sortable(this.$el.find(".js-sortable-blocks"), {afterDrag: this.rebuildIdList, itemSelector: ".content", handle: 'h4'});
        this.ajaxForm();
    },

    events: {
        "click .js-add-content": "addContent",
        "click .js-edit-concept-button": "changeConcept"
    },

    changeConcept: function(e) {
        e.preventDefault();

        var $field = this.$el.find("select[name='learning_module']");
        window.location = "/concepts/editor/" + $field.val();
    },

    beginSubmits: function()
    {
        this.countSubmits = 0;
        this.$el.find(".content form").submit();
    },

    ajaxForm: function()
    {
        this.$el.ajaxForm({
            beforeSubmit:  function (data, $form, options) {

            },
            success: function (data, text, xhr, $form) {
                if (data.success)
                {
                    console.log("Form submission returned success, refreshing page...");
                    window.location.reload();
                } else {
                    console.error("Form submission returned failure");
                }
            },
            error: function (data) {
                console.error("Form submission failed");
            }
        });
    },

    addContent: function(e)
    {
        var $button = $(e.target);
        var templateName = $button.attr("data-content");

        var view = new ComposeStepContentView({
            template: _.template( $("#" + templateName + "_template").html() ),
            parent: this
        });

        this.$el.find(".contents").append(view.render().el);
        view.convertTextArea();
        view.ajaxForm();
    },

    rebuildIdList: function()
    {
        // Clear the existing data
        console.log("Rebulding id list");
        $(".content-ids").html("");

        $(".contents .content .id-field").each( function () {

            var compile = _.template( $("#_step_content_id_entry_template").html() );
            var template = compile({"id": $(this).val() });

            $(".content-ids").append(template);

        });
    },

    contentSubmissionDone: function()
    {
        this.countSubmits += 1;

        if (this.countSubmits == this.$el.find(".content form").length)
        {
            this.finishedSubmissions();
        }
    },

    contentSubmissionError: function()
    {
        console.error("Submission of one content block failed.");
        this.countSubmits = 0;
    },

    finishedSubmissions: function()
    {
        this.$el.find("#addStepForm").submit();
    }
});

var ComposeStepContentView = Pillar.View.extend({
    init: function(opts)
    {
        this.parent = opts.parent;
        this.convertTextArea();
        this.ajaxForm();
    },

    events: {
        "click .js-delete-content": "deleteSelf",
        "click .js-minimise-content": "minimiseSelf",
        "change .code-input-language": "codeLanguageChange"
    },

    convertTextArea: function()
    {
        aceUtil.convertTextAreas(this.$el);
    },

    ajaxForm: function()
    {
        var that = this;

        this.$el.find("form").ajaxForm({
            beforeSubmit:  function (data, $form, options) {

            },
            success: function (data, text, xhr, $form) {
                if (data.success)
                {
                    $form.find(".id-field").val(data.id);
                    that.parent.rebuildIdList();
                    that.parent.contentSubmissionDone();
                } else {
                    that.parent.contentSubmissionError();
                }
            },
            error: function (data) {
                console.error(":(");
                that.parent.contentSubmissionError();
            }
        });
    },

    draw: function()
    {
        var html = this.template({});
        this.setElement(html);
    },

    deleteSelf: function(e)
    {
        e.preventDefault();
        var confirmation = confirm("Are you sure you want to remove this content block?");

        if (confirmation)
        {
            // parent.rebuildIdList();
            this.remove();
        }
    },

    minimiseSelf: function(e)
    {
        e.preventDefault();
        this.$el.toggleClass("minimised");
    },

    codeLanguageChange: function(e)
    {
        var $el = $(e.target);

        var editor = ace.edit($el.siblings(".ace_editor")[0]);
        console.log(editor);
        editor.getSession().setMode("ace/mode/" + $el.val());
    }
});

module.exports = {
    ComposeStepView: ComposeStepView,
    ComposeStepContentView: ComposeStepContentView
}

},{"aceUtil":7,"pillar/pillar":31,"sortable-list":36}],3:[function(require,module,exports){
var Pillar = require("pillar/pillar"),
    template = require("util/templating-util"),
    CommentListView = require("ui/js/_comment_list_view");

module.exports = CommentIconView;

var CommentIconView = Pillar.View.extend({
    init: function(opts)
    {
        this.params = opts.params;
        console.log(this.model);
    },

    events: {
        "click .js-show-comments": "showComments"
    },

    showComments: function(e)
    {
        e.preventDefault();

        var list = new CommentListView({params: {content_id: this.model.content}});
        var el = list.render().el;

        $("body").append( el );
        console.log("Comment List added", el);
    },

    template: Pillar.template("comment_icon"),

    draw: function(opts)
    {
        var data = this.model.toJSON();
        var html = Mustache.render(this.template, data);
        this.replaceElement(html);
    }
});

module.exports = CommentIconView;

},{"pillar/pillar":31,"ui/js/_comment_list_view":4,"util/templating-util":43}],4:[function(require,module,exports){
var Pillar = require("pillar/pillar"),
    animate = require("util/animate-util");

module.exports = Pillar.View.extend({
    init: function(opts)
    {
        opts = opts || {};
        this.params = opts.params || {};
    },

    events: {
        "click .js-close-comments": "closeComments",
        "click .comment-frame": "test"
    },

    template: Pillar.template("comment_list"),

    closeComments: function(e)
    {
        e.preventDefault();
        console.log("woo");
        animate.animateElement(this.$el, "fadeOutDown", this.fadeOut, this);
    },

    fadeOut: function($el, context)
    {
        context.remove();
    },

    getData: function()
    {
        return {};
    },

    draw: function(opts)
    {
        var data = this.getData();
        data.content_id = this.params.content_id;
        data.shared_image_id = this.$el.attr("data-shared-image");

        var html = Mustache.render(this.template, data);
        this.replaceElement(html);

        this.$el.css("display", "block");
        animate.animateElement(this.$el, "fadeInUp", null);
    }
});

},{"pillar/pillar":31,"util/animate-util":41}],5:[function(require,module,exports){
var util = require("util/_util");

var SortableItem = Backbone.Model.extend({
    defaults: {
        title: "",
        field_name: "",
        id: "",
        link: "#",
        cssClass: ""
    },

    initialize: function(attrs, opts)
    {
        this.set({id: util.getId(attrs)});
    }
});

var SortableItemCollection = Backbone.Collection.extend({
    model: SortableItem
});

module.exports = {
    SortableItem: SortableItem,
    SortableItemCollection: SortableItemCollection
};

},{"util/_util":40}],6:[function(require,module,exports){
var SortableItem = require("ui/js/_sortable_content_list_entry_model").SortableItem;
var Pillar = require("pillar/pillar");
var template = require("util/templating-util");

var SortableItemView = Pillar.View.extend({
    init: function(opts)
    {
        this.params = opts.params;
        this.model.on("change", this.render, this);
    },

    events: {
        "click .js-sortable-delete-link": "deleteSelf"
    },

    template: template.templateHtml("sortable_content_list_entry"),

    cssClass: function()
    {
        return this.model.get("active") ? "active" : "";
    },

    draw: function(opts)
    {
        var data = this.model.toJSON();
        data.cssClass = this.cssClass();
        var html = Mustache.render(this.template, this.model.toJSON());
        this.replaceElement(html);
    },

    deleteSelf: function(e)
    {
        e.preventDefault();
        this.model.collection.remove(this.model);
    }
});

var SortableItemListView = Pillar.CollectionView.extend({
    init: function(opts) {
        this.$el.find(".js-sortable").sortable({});

        this.$readSelectionFrom = $(this.el).find(".js-select2");
        this.hiddenFieldName = opts.hiddenFieldName;
        this.$targetList = this.$el.find(opts.targetList);

        this.collection.on('reset add remove', this.render, this);

        this.render();
    },

    events: {
        "click .js-sortable-add-new": "addEntry",
        "click .js-sortable-create-new": "newStepModal",
    },

    afterDraw: function()
    {
        this.$el.find(".loading").remove();
    },

    drawCollection: function(model)
    {
        model.set({field_name: this.hiddenFieldName})
        var itemView = new SortableItemView({model: model});
        this.views.push( itemView );
        this.$targetList.append(itemView.render().el);
    },

    newStepModal: function(e)
    {
        e.preventDefault();

        var view = new NewStepModalView({});
        $("body").append(view.render().el);
        view.showModal();
    },

    addEntry: function(e)
    {
        e.preventDefault();

        var model = new SortableItem({
            "title": this.$readSelectionFrom.find('option:selected').text(),
            "field_name": this.hiddenFieldName,
            "id": this.$readSelectionFrom.val()
        });

        this.collection.add( model );
    },
});

module.exports = {
    SortableItemView: SortableItemView,
    SortableItemListView: SortableItemListView
};

},{"pillar/pillar":31,"ui/js/_sortable_content_list_entry_model":5,"util/templating-util":43}],7:[function(require,module,exports){
var aceUtil = new function()
{
    this.convertTextAreas = function(selector) {

        var $el;

        if (typeof selector == "string") {
            $el = $(selector);
        } else {
            $el = selector;
        }

        $el.find('[data-editor]').each(function () {
            var el = $(this);

            if (el.prev().is(".ace_editor"))
            {
                console.log("Already an ace editor");
                return;
            }

            var mode = el.data('editor');

            var editDiv = $('<div>', {
                position: 'absolute',
                width: el.width(),
                height: Math.max(64, el[0].scrollHeight),
                'class': el.attr('class')
            }).insertBefore(el);

            el.css('display', 'none');

            var editor = ace.edit(editDiv[0]);

            editor.getSession().setValue(el.text());
            editor.getSession().setMode("ace/mode/" + mode);
            editor.getSession().setUseSoftTabs(false);
            editor.getSession().setUseWrapMode(true);
            editor.setTheme("ace/theme/terminal");

            editor.getSession().on('change', function(e) {
                el.text(editor.getSession().getValue());
            });

        });

    }

}

module.exports = aceUtil;





},{}],8:[function(require,module,exports){
var util = require("util/_util");

var AjaxFormView = Backbone.View.extend({
    initialize: function(opts)
    {
        this.ajaxForm();
        this.refreshPage = false;

        if ( util.defined(opts) )
        {
            if ('success' in opts)
            {
                this.success = opts.success;
            } else {
                this.success = this.defaultSuccess;
            }

            if ('failure' in opts)
            {
                this.failure = opts.failure;
            } else {
                this.failure = this.defaultFailure;
            }

            if ('beforeSubmit' in opts)
            {
                this.beforeSubmit = opts.beforeSubmit;
            } else {
                this.beforeSubmit = this.defaultBeforeSubmit;
            }

            if ('refreshPage' in opts)
            {
                this.refreshPage = opts.refreshPage;
            }
        }

    },

    defaultBeforeSubmit: function(data, $form, options)
    {

    },

    defaultSuccess: function(data, text, xhr, $form)
    {
        if (data.success)
        {
            console.log("Form submission returned success");
            if (this.refreshPage)
            {
                console.log("Refreshing page.");
                window.location.reload();
            }
        } else {
            console.error("Form submission returned failure");
        }
    },

    defaultFailure: function(data, text, xhr, $form)
    {
        console.error("Form submission failed");
    },

    ajaxForm: function()
    {
        var that = this;
        this.$el.ajaxForm({
            beforeSubmit:  function (data, $form, options) {
                that.beforeSubmit(data, $form, options);
            },
            success: function (data, text, xhr, $form) {
                that.success(data, text, xhr, $form);
            },
            error: function (data, text, xhr, $form) {
                that.failure(data, text, xhr, $form);
            }
        });
    }
});

module.exports = AjaxFormView;

},{"util/_util":40}],9:[function(require,module,exports){
function run()
{
    _.templateSettings = {
        interpolate: /\%\%=(.+?)\%\%/g,
        escape: /\%\%-(.+?)\%\%/g,
        evaluate: /\%\%(.+?)\%\%/g,
    };
}

module.exports = run;

},{}],10:[function(require,module,exports){
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

module.exports = boostrapMods;

},{}],11:[function(require,module,exports){
var eventUtil = require("util/event-util"),
    util = require("util/_util"),
    animate = require("util/animate-util");

// comments.js powers the comment frame for articles and images
var comments = new function()
{
    var self = this;

    self.bindComments = function()
    {
        console.log("BINDING COMMENTS");
        var id = "#comment_frame";
        var $frame = $(id);

        $(".step-body .comment, .shared-wrapper .comment").each( function() {

            var $comment = $(this);
            // Almost always the column content resides in
            var $parent = $(this).parent().parent().parent().parent();
            // This will be a .hideable-inner in an edge case
            var $otherParent = $(this).parent().parent().parent();
            var $sibling = $(this).prev();

            $(this).find('a').on("touchstart, click", function (e) {

                e.preventDefault();

                eventUtil.stopEventPropagating(e);

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

        $('html').on( "touchstart, click", function (e) {

            if ( eventUtil.eventTargetDoesNotInclude(e, '#comment_frame') )
            {
                if (!$frame.hasClass("animated") && $frame.css("display") == "block")
                {
                    animate.animate(id, 'fadeOutUp', function() { $frame.css("display", "none"); });
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

        if (util.findBootstrapEnvironment() == "ExtraSmall")
        {
            // Centre the display on mobiles
            $frame.offset({ left: getViewportWidth() / 2 - $frame.outerWidth() / 2, top: $comment.offset().top + offsetTop});
        } else {

            // Stop comments panel sticking off the right side of the display
            if ($comment.offset().left + offsetLeft + $frame.outerWidth() >= util.getViewportWidth())
            {
                $frame.offset({ left: getViewportWidth() - $frame.outerWidth() - 10, top: $comment.offset().top + offsetTop});
            } else {
                // Just display it normally
                $frame.offset({ left: $comment.offset().left + offsetLeft, top: $comment.offset().top + offsetTop});
            }


        }



        animate.animate(id, 'fadeInDown', null);

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

            animate.animate(id, 'fadeOutUp', function() { $frame.css("display", "none"); });

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

module.exports = comments;

},{"util/_util":40,"util/animate-util":41,"util/event-util":42}],12:[function(require,module,exports){
var animate = require("util/animate-util");

// definitions.js handle definition lookups

var definitions = new function()
{
    var self = this;

    self.convertDefinitionLinks = function()
    {
        $('a[href^="define:"]').each( function () {
            $(this).attr("rel", "definition");

            var query = $(this).attr("href").replace("define:", "");

            $(this).attr("data-query", query);
        });
    }

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

                        var model = {
                            title: data.title,
                            body: marked(data.body),
                            id: data._id["$oid"]
                        };

                        var html = Mustache.render(templateHtml("inserted_definition"), model);

                        $definition.parent().after(html);
                        animate.animate($definition.parent().next(), "fadeInUp");

                        if (mathjax) MathJax.Hub.Queue(["Typeset", MathJax.Hub, $definition.parent().next()[0]]);

                        $(".js-close-inserted-definition").click( function(e) {
                            e.preventDefault();

                            animate.animate($(this).parent(), "fadeOutDown", function($el) { $el.remove(); });
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

module.exports = definitions;

},{"util/animate-util":41}],13:[function(require,module,exports){
// hideable-region.js

var hideable = new function()
{
    var self = this;
    self.createHideableRegions = function()
    {
        $(".hideable-inner").each( function () {

            var $contentBlock = $(this).closest(".content-block");
            var $content = $contentBlock.next();

            $content.css("visibility", "hidden");
        });

        $(".js-toggle-hideable").click( function(e) {
            e.preventDefault();

            var $contentBlock = $(this).closest(".content-block");
            var $content = $contentBlock.next();

            if (isVisible($content))
            {
                $(this).text("Expand");
                animateElement( $content, "fadeOutLeftBig", function ($elem) { $elem.css("visibility", "hidden"); } );
            } else {
                $(this).text("Hide");
                $content.css("visibility", "visible");
                animateElement( $content, "fadeInLeftBig" );
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

module.exports = hideable;


},{}],14:[function(require,module,exports){
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

module.exports = learn;

},{}],15:[function(require,module,exports){
function run()
{
    window.loadingIndicator = '<div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>';
}

module.exports = run;

},{}],16:[function(require,module,exports){
var AjaxFormView = require("backbone/ajax_view");

function run(opts)
{
    new AjaxFormView({el: $("#addCourseForm"), refreshPage: true});
}

module.exports = {run: run};

},{"backbone/ajax_view":8}],17:[function(require,module,exports){
var aceUtil = require("aceUtil");

function run(opts)
{
    aceUtil.convertTextAreas(opts.selector);
}

module.exports = {run: run};

},{"aceUtil":7}],18:[function(require,module,exports){
var SortableItemListView = require("ui/js/_sortable_content_list_entry_view").SortableItemListView,
    SortableItem = require("ui/js/_sortable_content_list_entry_model").SortableItem,
    SortableItemCollection = require("ui/js/_sortable_content_list_entry_model").SortableItemCollection;

var models = require("ui/js/_sortable_content_list_entry_model");

function run(opts)
{
    var lessonCollection = new SortableItemCollection();

    _.each(window.doublejump.lessonListForCurrentCourse, function(model)
    {
        var model = new SortableItem({
            id: model["_id"]["$oid"],
            title: model.title,
            link: window.doublejump.urlBase + model["_id"]["$oid"]
        });

        lessonCollection.add(model);
    });

    new SortableItemListView({
        el: $("#lessons_sortable_list"),
        hiddenFieldName: 'course[lessons][]',
        targetList: '#lessons',
        collection: lessonCollection
    });
}

module.exports = {run: run};

},{"ui/js/_sortable_content_list_entry_model":5,"ui/js/_sortable_content_list_entry_view":6}],19:[function(require,module,exports){
var AjaxFormView = require("backbone/ajax_view");
var ComposeStepView = require("editor/step_view").ComposeStepView;
var ComposeStepContentView = require("editor/step_view").ComposeStepContentView;

function run()
{
    new AjaxFormView({
        el: $("#updateStepOrderForm")
    });

    var composeStepView = new ComposeStepView({el: $(".create-step-form")});

    $(".content").each( function() {
        console.log($(this));
        new ComposeStepContentView({el: $(this), parent: composeStepView});
    });

    $(".js-save-step").click( function (e)
    {
        e.preventDefault();

        $("#updateStepOrderForm").submit();
        composeStepView.beginSubmits();
    });
}

module.exports = {run: run};

},{"backbone/ajax_view":8,"editor/step_view":2}],20:[function(require,module,exports){
var comments = require("comments");
var sortable = require("sortable-list");

var EditorCourseList = new function()
{
    this.run = function(opts)
    {
        sortable.bindSortableLists({itemSelector: "li"});
    }
};

module.exports = EditorCourseList;

},{"comments":11,"sortable-list":36}],21:[function(require,module,exports){
var iconTab = require("ui/icon-tab");

function run(opts)
{
    iconTab.init();
}

module.exports = {run: run};

},{"ui/icon-tab":38}],22:[function(require,module,exports){
require("mixins/editor_course_list");
require("mixins/payment_details");
require("mixins/progress_bars");
require("mixins/sharing");
require("mixins/course_edit_page");
require("mixins/sortable_item_list");
require("mixins/ajax_form");
require("mixins/icon_tab");
require("mixins/edit_step");
require("mixins/convert_ace");
require("mixins/step_list");

var MixinController = new function()
{
    this.intialiseControllers = function()
    {
        $("[data-mixin]").each( function() {
            var controller = require($(this).attr("data-mixin")).run($(this).data());
        });
    }
}

module.exports = MixinController;

},{"mixins/ajax_form":16,"mixins/convert_ace":17,"mixins/course_edit_page":18,"mixins/edit_step":19,"mixins/editor_course_list":20,"mixins/icon_tab":21,"mixins/payment_details":23,"mixins/progress_bars":24,"mixins/sharing":25,"mixins/sortable_item_list":26,"mixins/step_list":27}],23:[function(require,module,exports){
var payment = require("payment_validation");

var PaymentDetails = new function()
{
    this.run = function(opts)
    {
        payment.init();
    }
}

module.exports = PaymentDetails;

},{"payment_validation":30}],24:[function(require,module,exports){
var progress = require("progress-bar");

var ProgressBars = new function()
{
    this.run = function(opts)
    {
        progress.initHorizontalBars();
        progress.bindProgressBarResize();
        progress.initVerticalBars();
    }
};

module.exports = ProgressBars;

},{"progress-bar":32}],25:[function(require,module,exports){
var sharing = require("sharing-progress");

function run(opts)
{
    sharing.bindImageClick();
    sharing.bindSharingImageForm();
    sharing.bindPageResize();
    sharing.bindLikeImage();
}

module.exports = {run: run};

},{"sharing-progress":34}],26:[function(require,module,exports){
var SortableItemCollection = require("ui/js/_sortable_content_list_entry_model").SortableItemCollection,
    SortableItemListView = require("ui/js/_sortable_content_list_entry_view").SortableItemListView;

function run(opts)
{
    var list = new SortableItemListView({
        el: $(opts.selector),
        hiddenFieldName: opts.hiddenFieldName,
        targetList: opts.targetList,
        collection: new SortableItemCollection(window.doublejump[opts.data])
    });
}

module.exports = {run: run};

},{"ui/js/_sortable_content_list_entry_model":5,"ui/js/_sortable_content_list_entry_view":6}],27:[function(require,module,exports){
var SortableItemListView = require("ui/js/_sortable_content_list_entry_view").SortableItemListView,
    SortableItem = require("ui/js/_sortable_content_list_entry_model").SortableItem,
    SortableItemCollection = require("ui/js/_sortable_content_list_entry_model").SortableItemCollection;

function run(opts)
{
    var collection = new SortableItemCollection();

    console.log(window.doublejump.stepListForCurrentLesson);

    $(function() {
        _.each(window.doublejump.stepListForCurrentLesson, function(model)
        {
            var id = model["_id"]["$oid"];
            var active = false;

            if (id == window.doublejump.currentStep)
            {
                active = true;
            }

            var model = new SortableItem({
                id: id,
                title: model.title,
                link: window.doublejump.urlBase + id,
                active: active
            });

            collection.add(model);
        });

        new SortableItemListView({
            el: $("#steps_sortable_list"),
            hiddenFieldName: 'lesson[steps][]',
            targetList: '#steps',
            collection: collection
        });
    });
}

module.exports = {run: run};

},{"ui/js/_sortable_content_list_entry_model":5,"ui/js/_sortable_content_list_entry_view":6}],28:[function(require,module,exports){
require("ui/js/_comment_icon_view");

function run()
{
    $("[data-view-model]").each( function() {
        var vm = $(this).attr("data-view-model");
        $(this).removeAttr("data-view-model");

        new (require(vm))({el: $(this), model: new Backbone.Model($(this).data()) });


    });
}

module.exports = run;

},{"ui/js/_comment_icon_view":3}],29:[function(require,module,exports){
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

module.exports = notifications;

},{}],30:[function(require,module,exports){
var paymentValidation = new function()
{
    this.init = function init()
    {
        if (typeof Stripe == "undefined" || typeof jQuery.payment == "undefined")
        {
            console.error("Payment Validation has a hard dependency on the Stripe API and the jQuery Payment Plugin.");
            return;
        }

        Stripe.setPublishableKey("pk_test_90Yk2QxvQRPpw2T5qEQtyvoP");

        $('#cc_num').payment('formatCardNumber');
        $('#cc_cvc').payment('formatCardCVC');
        $('#cc_expire').payment('formatCardExpiry');

        $("#cc_expire").keyup( function() {
            var expiry = $(this).payment('cardExpiryVal');

            $("#cc_exp_month").val(expiry.month);
            $("#cc_exp_year").val(expiry.year);
        });

        $('#editAccountSettingsForm').submit(function(event) {
            var $form = $(this);

            // Disable the submit button to prevent repeated clicks
            $form.find('button').prop('disabled', true);

            Stripe.card.createToken($form, stripeResponseHandler);

            // Prevent the form from submitting with the default action
            return false;
        });

        function stripeResponseHandler(status, response) {
            var $form = $('#editAccountSettingsForm');

            if (response.error) {
                // Show the errors on the form
                $form.find('.payment-errors').text(response.error.message);
                $form.find('button').prop('disabled', false);
            } else {
                // response contains id and card, which contains additional card details
                var token = response.id;
                // Insert the token into the form so it gets submitted to the server
                $form.append($('<input type="hidden" name="stripeToken" />').val(token));
                // and submit
                $form.get(0).submit();
            }
        };
    }
}

module.exports = paymentValidation;

},{}],31:[function(require,module,exports){
Pillar = {} || Pillar;

Pillar.superOf = function(clazz)
{
    return clazz.constructor.__super__;
}

Pillar.extendEvents = function(view) {
    view.events = _.extend({}, Pillar.superOf(view).events, view.events);
}

Pillar.template = function(name)
{
    return $("[data-template='" + name + "']").html();
}

Pillar.Templates = {
    templates: {},

    register: function(name, html)
    {
        this.templates[name] = html;
    },

    get: function(name)
    {
        return this.templates[name];
    },

    smartRegister: function(name)
    {
        this.register(name, Pillar.Templates.template( $("#_" + name + "_template").html() ));
    },

    evalIfFunction: function(obj, attr)
    {
        if (typeof obj[attr] == "function")
        {
            return obj[attr]();
        } else if (typeof obj[attr] != "undefined")
        {
            return obj[attr];
        } else if (typeof obj.get == "function" && typeof obj.get(attr) != "undefined")
        {
            return obj.get(attr);
        } else {
            return "";
        }
    },

    getPlaceholder: function(string)
    {
        return "{{"+string+"}}";
    },

    // TODO: optimisation where we return a function from there, that concats string fragments and an attrs object using .join
    // Need to split final HTML string at {{tokens}};
    compileTemplate: function($template)
    {
        var $html = $template.clone();
        var $elems = $html.find("[data-pillar]").toArray();

        if (typeof $html.attr("data-pillar") != "undefined")
        {
            $elems.unshift($html);
        }

        _.each($elems, function(elem)
        {
            var $el = $(elem);
            var links = $el.attr("data-pillar");
            var toLink = links.split(",");

            $.each(toLink, function(index, property)
            {
                var trimmed = property.trim();
                var splitTerm = trimmed.split("<-");
                var attr = splitTerm[0];
                var valueName = splitTerm[1];

                var specialAttrs = {
                    "extraClass": function($el) {
                        $el.addClass(Pillar.Templates.getPlaceholder(valueName));
                    },
                    "visible": function($el) {
                        $el.attr("data-visible", Pillar.Templates.getPlaceholder(valueName));
                    },
                    "hidden": function($el) {
                        $el.attr("data-hidden", Pillar.Templates.getPlaceholder(valueName));
                    },
                    "text": function($el) {
                        $el.html(Pillar.Templates.getPlaceholder(valueName));
                    }
                };

                if (attr in specialAttrs)
                {
                    specialAttrs[attr]($el);
                } else {
                    $el.attr(attr, Pillar.Templates.getPlaceholder(valueName));
                }
            });

            $el.removeAttr("data-pillar");
            $el.attr("data-pillar-rendered", true);
        });

        var finalString = $html.clone().wrap("<div/>").parent().html();

        var reNoGroup = /\{\{[^}}]+\}\}/g;
        var re = /\{\{([^}}]+)\}\}/g;
        var parts = finalString.split(reNoGroup);
        var matches = finalString.match(re);

        var f = function (attrs)
        {
            var sBuild = [];
            // console.log(parts);
            for (var i = 0; i < parts.length; i++)
            {
                sBuild.push(parts[i]);
                if (i < matches.length)
                {
                    var cleanMatchName = matches[i].replace("{{", "").replace("}}", "");
                    // console.log(matches[i], Pillar.Templates.evalIfFunction(attrs, cleanMatchName));
                    sBuild.push(Pillar.Templates.evalIfFunction(attrs, cleanMatchName));
                }
            }

            return sBuild.join("")
        }

        return f;
    },

    template: function(html)
    {
        return this.compileTemplate($(html));
    },

    renderTemplate: function(template, attrs)
    {
        return template(attrs);
    }
}

Pillar.View = Backbone.View.extend({
    initialize: function(opts)
    {
        Pillar.superOf(this).initialize(opts);
        Pillar.extendEvents(this);

        if (opts)
        {
            if ("template" in opts)
            {
                this.template = opts.template;
            }
        }

        this.init(opts);
    },

    replaceElement: function(html)
    {
        var $oldEl = this.$el;
        this.setElement(html);
        $oldEl.replaceWith(this.$el);
    },

    defaultDraw: function()
    {
        var data = {};
        if (this.model)
        {
            data = this.model.toJSON();
        }
        var html = Mustache.render(this.template, data);
        this.replaceElement(html);
    },

    renderTemplate: Pillar.Templates.renderTemplate,

    _super: function()
    {
        return Pillar.superOf(this).initialize(opts);
    },

    // init is called up the extension stack the way one might expect
    init: function(opts)
    {

    },

    // Render is wrapped to always return this, and provide easy hookins for before and
    // after drawing
    render: function()
    {
        this.beforeDraw();
        this.draw();
        this.afterDraw();

        this.delegateEvents(this.events);

        return this;
    },

    draw: function() {},
    beforeDraw: function() {},
    afterDraw: function() {}
});

Pillar.CollectionView = Pillar.View.extend({
    init: function(opts)
    {
        this.views = [];
    },

    // Remove all existing views from the collection view,
    // since we are about to redraw all of the child views.
    beforeDraw: function()
    {
        _.each(this.views, function(view)
        {
            view.remove();
        });

        this.views = [];
    },

    // Iterate over all models in the collection, drawing each individual model.
    // Shortcut for manually looping over the models.
    // If more control is needed, override draw and this will not be called.
    drawCollection: function(model)
    {

    },

    draw: function()
    {
        this.collection.each(this.drawCollection, this);
    }
});

Pillar.BaseTestView = Pillar.View.extend({

    init: function(opts)
    {
        console.log("Base INIT");
    },

    events: {
        "click": "helloWorld"
    },

    helloWorld: function(e)
    {
        console.log("Hello World");
    }
});

Pillar.TestView = Pillar.BaseTestView.extend({

    init: function(opts)
    {
        console.log("INIT");
    },

    events: {
        "click .all": "whatUp"
    },

    whatUp: function(e)
    {
        console.log("What Up!");
    }
});

Pillar.ExtendedTextView = Pillar.TestView.extend({
    init: function(opts)
    {
        console.log("Child INIT");
    }
});

module.exports = Pillar;

},{}],32:[function(require,module,exports){
// progress-bar.js powers the progress bar during a lesson

var util = require("util/_util");

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

        if ($(".course-progress-node").length > 0)
        {
            window.setInterval( self.updateProgressBars, 100 );
        }

        $(window).resize( self.updateProgressBars );

        // If we are running CSS animations, then we need to keep the progress bars up to date
        if (util.supportsTransitions())
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

module.exports = progress;

},{"util/_util":40}],33:[function(require,module,exports){
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

module.exports = search;

},{}],34:[function(require,module,exports){
// sharing-progress.js controls everything about the gallery sharing steps

var learn = require("learn");

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

module.exports = sharing;

},{"learn":14}],35:[function(require,module,exports){
// slug-fields.js powers slugifying and lower-casing of fields into another field

var util = require("util/_util");

var slug = new function()
{
    var self = this;

    self.bindSlugFields = function()
    {
        $(".js-slug").keyup( function() {

            var targetId = "#" + $(this).attr("data-object") + "_" + $(this).attr("data-target");

            $(targetId).val( util.convertToSlug( $(this).val() ) );

        });
    }

    self.slugify = function(el, slugEl)
    {
        $el = $(el);
        $slugEl = $(slugEl);

        $el.keyup( function() {

            $slugEl.val( util.convertToSlug( $(this).val() ) );
            $slugEl.trigger("change");

        });
    }

    self.bindLowercaseFields = function()
    {
        $(".js-lowercase").keyup( function() {

            var targetId = "#" + $(this).attr("data-object") + "_" + $(this).attr("data-target");

            $(targetId).val( util.convertToLowercase( $(this).val() ) );

        });
    }


}

module.exports = slug;

},{"util/_util":40}],36:[function(require,module,exports){
// sortable-list.js powers the re-orderable lists for creating steps, lessons, etc.

var sortable = new function()
{
    var self = this;

    this.bindDeleteLinks = function()
    {
        // Bind our delete links
        $(".js-sortable-delete-link").off();
        $(".js-sortable-delete-link").bind('click', function(e) {
            e.preventDefault();
            $(this).parent().remove();
        });
    }

    this.sortable = function($el, opts)
    {
        opts.onDrop = function($item, container, _super, event)
        {
            $item.removeClass("dragged").removeAttr("style");
            $("body").removeClass("dragging");
            if (opts.afterDrag) opts.afterDrag(event);
        }

        $el.sortable(opts);
    }

    this.bindSortableLists = function(opts, selector)
    {
        selector = typeof selector !== 'undefined' ? selector : '.js-sortable';

        console.log("HELO");
        if (opts == null)
        {
            opts = {};
            opts.afterDrag = function() {};
        }

        if (jQuery().sortable)
        {

            // Don't double up our event handlers
            $(selector).off();
            $(".js-sortable-add-new").off();

            opts.onDrop = function($item, container, _super, event)
            {
                $item.removeClass("dragged").removeAttr("style");
                $("body").removeClass("dragging");
                if (opts.afterDrag) opts.afterDrag();
            }


            // Set up the list
            $(selector).sortable(opts);


            self.bindDeleteLinks();

            // Add a new row to the list
            $(".js-sortable-add-new").click( function(e) {



                var $readSelectionFrom = $( $(this).attr("data-read-selection-from") ),
                    hiddenField = $(this).attr("data-hidden-field-name"),
                    $targetList = $( $(this).attr("data-target-list") );

                e.preventDefault();

                $targetList.append( format(
                                            getTemplate("_sortable_content_list_entry"),
                                            {
                                                "item-text": $readSelectionFrom.find('option:selected').text(),
                                                "field-name": hiddenField,
                                                "field-value": $readSelectionFrom.val(),
                                            }
                                        )
                                    );

                self.bindDeleteLinks();
            });

        }
    }
}

module.exports = sortable;

},{}],37:[function(require,module,exports){
var twoCols = new function()
{

    var self = this;

    this.repositionColumns = function()
    {

        $(".two-cols").each( function () {
            var col1 = $(this).next();
            var col2 = $(this).next().next();

            col1.detach().appendTo($(this).find(".col1"));
            col2.detach().appendTo($(this).find(".col2"));
        });
    }

}

module.exports = twoCols;

},{}],38:[function(require,module,exports){
var iconTab = new function ()
{
    this.initialised = false;

    this.init = function ()
    {
        if (!this.initialised)
        {
            $(".icon-button-tab").click( function(e) {
                e.preventDefault();
                var index = parseInt($(this).attr("data-target"));

                console.debug(index);
                var $boxes = $(".landing-page-box");

                $boxes.removeClass("visible");
                $( $boxes[index] ).addClass("visible");
            });

            this.initialised = true;
        }
    }
}

module.exports = iconTab;

},{}],39:[function(require,module,exports){
function extendJq()
{
    $.postWithCsrf = function (url, data, success)
    {
        data[$("meta[name=csrf-param]").attr("content")] = $("meta[name=csrf-token]").attr("content");
        $.post(url, data, success);
    };
}

module.exports = extendJq;

},{}],40:[function(require,module,exports){
var util = new function()
{
    this.init = function()
    {
        // Shim for String.trunc()
        String.prototype.trunc = String.prototype.trunc ||
            function(n) {
                return this.length > n ? this.substr(0, n - 3)+'...' : this;
            };
    }

    // Extract a mongoId from a model
    this.getId = function(attrs)
    {

        // Use a Mongo Id if we don't have one already
        if (!attrs.id && attrs["_id"]["$oid"])
        {
            return attrs["_id"]["$oid"];
        } else {
            return attrs.id;
        }
    }

    this.definedIn = function(obj, variable)
    {
        return
    }

    this.defined = function(variable)
    {
        return typeof window[variable] != "undefined";
    }

    this.convertToSlug = function(text)
    {
        return text
            .toLowerCase()
            .replace(/[^\w ]+/g,'')
            .replace(/ +/g,'-');
    }

    this.convertToLowercase = function(text)
    {
        return text.toLowerCase();
    }

    this.supportsTransitions = function() {
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

    this.isVisible = function($elem)
    {
        if ($elem.css("display") != "none" && $elem.css("visibility") != "hidden")
        {
            return true;
        } else {
            return false;
        }
    }

    this.insertTextAtCursor = function(text) {
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

    this.saveSelection = function() {
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

    this.restoreSelection = function(range) {
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

    this.findBootstrapEnvironment = function() {
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

    this.getViewportWidth = function()
    {
        return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    }

    this.getViewportHeight = function()
    {
        return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    }

}

module.exports = util;

},{}],41:[function(require,module,exports){
var util = require("util/_util");

/**
 * Calls an Animate.css animation on the provided selector
 * @param  {[type]} element_ID [description]
 * @param  {[type]} animation  [description]
 */
function animate(element_ID, animation, completeCallback, context) {

    animateElement($(element_ID), animation, completeCallback, context);

}

function animateElement($element, animation, completeCallback, context) {

    if (util.supportsTransitions())
    {
        if ($element.attr("data-timeout-id"))
        {
            window.clearTimeout($element.attr("data-timeout-id"));
        }

        $element.addClass(animation);
        $element.addClass("animated");

        var timeoutId = window.setTimeout( function () {

            if ($element.hasClass("animated"))
            {
                $element.removeClass(animation);
                $element.removeClass("animated");

                if (completeCallback != null)
                {
                    completeCallback($element);
                }
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
                    completeCallback($element, context);
                }
            }
        );
    } else {
        completeCallback($element);
    }


}

module.exports = {
    animate: animate,
    animateElement: animateElement
}

},{"util/_util":40}],42:[function(require,module,exports){
var eventUtil = new function()
{
  this.stopEventPropagating = function(e)
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

  this.eventTargetDoesNotInclude = function(event, element)
  {
      return ( $(event.target).closest(element).length == 0 );
  }
}

module.exports = eventUtil;

},{}],43:[function(require,module,exports){
function getTemplate(name)
{
    return $("#" + name + "_template").html();
}

function templateHtml(name)
{
    return $("[data-template=" + name + "]").html();
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

module.exports = {
    getTemplate: getTemplate,
    templateHtml: templateHtml,
    format: format
}

},{}]},{},[1])


//# sourceMappingURL=bundle.js.map