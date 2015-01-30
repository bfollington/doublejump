
var SortableItemView = Pillar.View.extend({
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
