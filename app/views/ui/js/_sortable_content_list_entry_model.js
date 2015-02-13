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
