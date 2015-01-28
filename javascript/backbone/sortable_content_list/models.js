var SortableItem = Backbone.Model.extend({
    defaults: {
        title: "",
        field_name: "",
        id: "",
        link: "#",
        cssClass: ""
    },

    initialize: function(attrs, opts)
    {
        // Use a Mongo Id if we don't have one already
        if (!attrs.id && attrs["_id"]["$oid"])
        {
            this.set({id: attrs["_id"]["$oid"]});
        }
    }
});

var SortableItemCollection = Backbone.Collection.extend({
  model: SortableItem
});
