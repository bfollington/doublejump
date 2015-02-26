var SortableItemListView = require("ui/js/_sortable_content_list_entry_view").SortableItemListView,
    SortableItem = require("ui/js/_sortable_content_list_entry_model").SortableItem,
    SortableItemCollection = require("ui/js/_sortable_content_list_entry_model").SortableItemCollection;

function run(opts)
{
    var collection = new SortableItemCollection();

    console.log(window.doublejump.stepListForCurrentLesson);

    $(function() {
        _.each(window.doublejump.stepListForCurrentLesson, function(model)
        {
            var id = model["_id"]["$oid"];
            var active = false;

            if (id == window.doublejump.currentStep)
            {
                active = true;
            }

            var model = new SortableItem({
                id: id,
                title: model.title,
                link: window.doublejump.urlBase + id,
                active: active
            });

            collection.add(model);
        });

        new SortableItemListView({
            el: $("#steps_sortable_list"),
            hiddenFieldName: 'lesson[steps][]',
            targetList: '#steps',
            collection: collection
        });
    });
}

module.exports = {run: run};
