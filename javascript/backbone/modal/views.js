var ModalView = Pillar.View.extend({
    init: function(opts)
    {

    },

    events: {
        "hidden.bs.modal": "modalHidden"
    },

    draw: function()
    {
        var html = this.template({});
        this.setElement(html);
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

    init: function(opts)
    {
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

    afterDraw: function()
    {
        this.ajaxForm();
        slug.slugify( this.$el.find("input[name=title]"), this.$el.find("input[name=slug]") );
    }
});
