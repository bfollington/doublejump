var ModalView = Backbone.View.extend({
    initialize: function(opts)
    {
        this.template = opts.template;
    },

    events: {
        "hidden.bs.modal": "modalHidden"
    },

    render: function()
    {
        var html = this.template({});
        this.setElement(html);
        this.afterRender();
        return this;
    },

    afterRender: function()
    {

    },

    modalHidden: function(e)
    {
        // When the modal fades out, we remove it from the DOM
        console.log("HIDDEN");
        this.remove();
    },

    showModal: function()
    {
        this.$el.modal({});
    }
});

var NewStepModalView = ModalView.extend({

    initialize: function(opts)
    {
        Backbone.superOf(this).initialize(opts);
        Backbone.extendEvents(this);

        if (opts.el)
        {
            this.ajaxForm();
        }
    },

    ajaxForm: function()
    {
        this.ajax = new AjaxFormView({
            el: this.$el.find("#addStepForm"),
            success: function(data, text, xhr, $form)
            {
                var collection = window.doublejump.stepListForCurrentLesson;
                var view = window.doublejump.stepListView;
                collection.add(new SortableItem({
                    id: data.id,
                    title: data.title,
                    field_name: view.hiddenFieldName
                }));
            }
        });
    },

    events: {
        "click .modal-header": "clickHeader"
    },

    afterRender: function()
    {
        this.ajaxForm();
        slug.slugify( this.$el.find("input[name=title]"), this.$el.find("input[name=slug]") );
    },

    clickHeader: function(e)
    {
        console.log("Test");
    }
});
