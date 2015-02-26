var AjaxFormView = require("backbone/ajax_view");

function run(opts)
{
    new AjaxFormView({el: $("#addCourseForm"), refreshPage: true});
}

module.exports = {run: run};
