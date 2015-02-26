var SortableItemCollection = require("ui/js/_sortable_content_list_entry_model").SortableItemCollection,
    SortableItemListView = require("ui/js/_sortable_content_list_entry_view").SortableItemListView;

function run(opts)
{
    var list = new SortableItemListView({
        el: $(opts.selector),
        hiddenFieldName: opts.hiddenFieldName,
        targetList: opts.targetList,
        collection: new SortableItemCollection(window.doublejump[opts.data])
    });
}

module.exports = {run: run};
