var SortableItemView = Backbone.View.extend({
    initialize: function(opts)
    {
        this.params = opts.params;
    },

    events: {
        "click .js-sortable-delete-link": "deleteSelf"
    },

    template: _.template( $("#_sortable_content_list_entry_backbone_template").html() ),

    render: function(opts)
    {
        var html = this.template(this.model.toJSON());
        this.setElement(html);
        return this;
    },

    deleteSelf: function(e)
    {
        e.preventDefault();

        this.remove();
    }
});

var SortableItemListView = Backbone.View.extend({
    initialize: function(opts) {
        this.$el.find(".js-sortable").sortable({});

        this.$readSelectionFrom = $(this.el).find(".js-select2");
        this.hiddenFieldName = opts.hiddenFieldName;
        this.$targetList = this.$el.find(opts.targetList);
        this.views = [];

        console.log(this);
        this.render();
    },

    events: {
        "click .js-sortable-add-new": "addEntry",
    },

    render: function()
    {
        _.each(this.views, function(view)
        {
            view.remove();
        });

        this.views = [];

        this.collection.each( function(model) {
            model.set({field_name: this.hiddenFieldName})
            var itemView = new SortableItemView({model: model});
            this.views.push( itemView );
            this.$targetList.append(itemView.render().el);
        }, this);

        return this;
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

        console.log(model);

        this.collection.add( model );

        this.render();
    },
});
