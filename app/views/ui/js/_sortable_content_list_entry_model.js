var util = require("util/_util");

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
        this.set({id: util.getId(attrs)});
    }
});

var SortableItemCollection = Backbone.Collection.extend({
    model: SortableItem
});

module.exports = {
    SortableItem: SortableItem,
    SortableItemCollection: SortableItemCollection
};
