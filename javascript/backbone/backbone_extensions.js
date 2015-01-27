Pillar = {} || Pillar;

Pillar.superOf = function(clazz)
{
    return clazz.constructor.__super__;
}

Pillar.extendEvents = function(view) {
    view.events = _.extend({}, Pillar.superOf(view).events, view.events);
}

Pillar.View = Backbone.View.extend({
    initialize: function(opts)
    {
        Pillar.superOf(this).initialize(opts);
        Pillar.extendEvents(this);

        if (opts)
        {
            if ("template" in opts)
            {
                this.template = opts.template;
            }
        }

        this.init(opts);
    },

    _super: function()
    {
        return Pillar.superOf(this).initialize(opts);
    },

    // init is called up the extension stack the way one might expect
    init: function(opts)
    {

    },

    // Render is wrapped to always return this, and provide easy hookins for before and
    // after drawing
    render: function()
    {
        this.beforeDraw();
        this.draw();
        this.afterDraw();
        return this;
    },

    draw: function() {},
    beforeDraw: function() {},
    afterDraw: function() {}
});

Pillar.CollectionView = Pillar.View.extend({
    init: function(opts)
    {
        this.views = [];
    },

    // Remove all existing views from the collection view,
    // since we are about to redraw all of the child views.
    beforeDraw: function()
    {
        _.each(this.views, function(view)
        {
            view.remove();
        });

        this.views = [];
    },

    // Iterate over all models in the collection, drawing each individual model.
    // Shortcut for manually looping over the models.
    // If more control is needed, override draw and this will not be called.
    drawCollection: function(model)
    {

    },

    draw: function()
    {
        this.collection.each(this.drawCollection, this);
    }
});

Pillar.BaseTestView = Pillar.View.extend({

    init: function(opts)
    {
        console.log("Base INIT");
    },

    events: {
        "click": "helloWorld"
    },

    helloWorld: function(e)
    {
        console.log("Hello World");
    }
});

Pillar.TestView = Pillar.BaseTestView.extend({

    init: function(opts)
    {
        console.log("INIT");
    },

    events: {
        "click .all": "whatUp"
    },

    whatUp: function(e)
    {
        console.log("What Up!");
    }
});

Pillar.ExtendedTextView = Pillar.TestView.extend({
    init: function(opts)
    {
        console.log("Child INIT");
    }
});
