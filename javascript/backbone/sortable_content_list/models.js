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
        this.set({id: getId(attrs)});
    }
});

var SortableItemCollection = Backbone.Collection.extend({
  model: SortableItem
});
