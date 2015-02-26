//step_view.js
var ComposeStepView = (function() {

    return Pillar.View.extend({
        init: function(opts)
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
})();

var ComposeStepContentView = (function() {

    return Pillar.View.extend({
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
})();
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
//_comment_icon_view.js
var CommentIconView = (function() {
    return Pillar.View.extend({
        init: function(opts)
        {
            this.params = opts.params;
            this.model.on("change", this.render, this);
        },

        events: {

        },

        template: templateHtml("sortable_content_list_entry"),

        draw: function(opts)
        {
            var data = this.model.toJSON();
            data.cssClass = this.cssClass();
            var html = Mustache.render(this.template, this.model.toJSON());
            this.replaceElement(html);
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