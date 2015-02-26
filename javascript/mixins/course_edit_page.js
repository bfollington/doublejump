var SortableItemListView = require("ui/js/_sortable_content_list_entry_view").SortableItemListView,
    SortableItem = require("ui/js/_sortable_content_list_entry_model").SortableItem,
    SortableItemCollection = require("ui/js/_sortable_content_list_entry_model").SortableItemCollection;

var models = require("ui/js/_sortable_content_list_entry_model");

function run(opts)
{
    var lessonCollection = new SortableItemCollection();

    _.each(window.doublejump.lessonListForCurrentCourse, function(model)
    {
        var model = new SortableItem({
            id: model["_id"]["$oid"],
            title: model.title,
            link: window.doublejump.urlBase + model["_id"]["$oid"]
        });

        lessonCollection.add(model);
    });

    new SortableItemListView({
        el: $("#lessons_sortable_list"),
        hiddenFieldName: 'course[lessons][]',
        targetList: '#lessons',
        collection: lessonCollection
    });
}

module.exports = {run: run};
