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
