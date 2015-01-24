var ComposeStepView = Backbone.View.extend({
    initialize: function(opts)
    {
        console.log("INIT");
        this.rebuildIdList();
        this.countSubmits = 0;
        sortable.sortable(this.$el.find(".js-sortable-blocks"), {afterDrag: this.rebuildIdList, itemSelector: ".content", handle: 'h4'});
        this.ajaxForm();
    },

    events: {
        "click .js-add-content": "addContent"
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

var ComposeStepContentView = Backbone.View.extend({
    initialize: function(opts)
    {
        this.template = opts.template;
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

    render: function()
    {
        var html = this.template({});
        this.setElement(html);

        return this;
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
