Backbone.superOf = function(clazz)
{
    return clazz.constructor.__super__;
}

Backbone.extendEvents = function(view) {
    view.events = _.extend({}, Backbone.superOf(view).events, view.events);
}
