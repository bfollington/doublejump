//_modal_view.js
var ModalView = (function() {
    return Pillar.View.extend({
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

        hideModal: function()
        {
            this.$el.modal('hide');
        },

        showModal: function()
        {
            this.$el.modal({});
        }
    });
})();
//_sortable_content_list_entry_model.js
var SortableItem = (function() {
    return Backbone.Model.extend({
        defaults: {
            title: "",
            field_name: "",
            id: "",
            link: "#",
            cssClass: ""
        },

        initialize: function(attrs, opts)
        {
            this.set({id: getId(attrs)});
        }
    });
})();

var SortableItemCollection = (function () {
    return Backbone.Collection.extend({
        model: SortableItem
    });
})();
//_sortable_content_list_entry_view.js
var SortableItemView = (function() {
    return Pillar.View.extend({
        init: function(opts)
        {
            this.params = opts.params;
            this.model.on("change", this.render, this);
        },

        events: {
            "click .js-sortable-delete-link": "deleteSelf"
        },

        template: templateHtml("sortable_content_list_entry"),

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
})();

var SortableItemListView = (function() {
    return Pillar.CollectionView.extend({
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
            console.log()
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
            console.log("Add Entry");

            var model = new SortableItem({
                "title": this.$readSelectionFrom.find('option:selected').text(),
                "field_name": this.hiddenFieldName,
                "id": this.$readSelectionFrom.val()
            });

            this.collection.add( model );
        },
    });
})();
//_new_step_modal_view.js
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