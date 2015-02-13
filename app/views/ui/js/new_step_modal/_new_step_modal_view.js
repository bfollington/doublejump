var NewStepModalView = (function() {

    return ModalView.extend({
        init: function(opts)
        {
            if (opts.el)
            {
                this.ajaxForm();
            }
        },

        template: templateHtml("new_step_modal"),

        draw: function()
        {
            this.defaultDraw();
        },

        ajaxForm: function()
        {
            var that = this;
            this.ajax = new AjaxFormView({
                el: this.$el.find("#addStepForm"),
                success: function(data, text, xhr, $form)
                {
                    if (data.success)
                    {
                        var collection = window.doublejump.stepListForCurrentLesson;
                        var view = window.doublejump.stepListView;
                        collection.add(new SortableItem({
                            id: data.id,
                            title: data.title,
                            field_name: view.hiddenFieldName
                        }));
                        that.hideModal();
                    } else {
                        console.error("Errors: ", data.errors);
                    }

                }
            });
        },

        afterDraw: function()
        {
            this.ajaxForm();
            slug.slugify( this.$el.find("input[name=title]"), this.$el.find("input[name=slug]") );
        }
    });
})();
