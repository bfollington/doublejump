var SortableItemView = Pillar.View.extend({
    init: function(opts)
    {
        this.params = opts.params;
    },

    events: {
        "click .js-sortable-delete-link": "deleteSelf"
    },

    template: _.template( $("#_sortable_content_list_entry_backbone_template").html() ),

    draw: function(opts)
    {
        var html = this.template(this.model.toJSON());
        this.setElement(html);
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
    },

    drawCollection: function(model)
    {
        model.set({field_name: this.hiddenFieldName})
        var itemView = new SortableItemView({model: model});
        this.views.push( itemView );
        this.$targetList.append(itemView.render().el);
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
