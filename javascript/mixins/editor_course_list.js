var comments = require("comments");
var sortable = require("sortable-list");

var EditorCourseList = new function()
{
    this.run = function(opts)
    {
        sortable.bindSortableLists({itemSelector: "li"});
    }
};

module.exports = EditorCourseList;
