var AjaxFormView = Backbone.View.extend({
    initialize: function(opts)
    {
        this.ajaxForm();

        if (opts.success)
        {
            this.success = opts.success;
        } else {
            this.success = this.defaultSuccess;
        }

        if (opts.failure)
        {
            this.failure = opts.failure;
        } else {
            this.failure = this.defaultFailure;
        }

        if (opts.beforeSubmit)
        {
            this.beforeSubmit = opts.beforeSubmit;
        } else {
            this.beforeSubmit = this.defaultBeforeSubmit;
        }

        this.refreshPage = false;
        if (opts.refreshPage)
        {
            this.refreshPage = refreshPage;
        }
    },

    defaultBeforeSubmit: function(data, $form, options)
    {

    },

    defaultSuccess: function(data, text, xhr, $form)
    {
        if (data.success)
        {
            console.log("Form submission returned success, refreshing page...");
            if (this.refreshPage) window.location.reload();
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
