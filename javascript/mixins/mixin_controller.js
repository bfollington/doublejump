require("mixins/editor_course_list");
require("mixins/payment_details");
require("mixins/progress_bars");
require("mixins/sharing");
require("mixins/course_edit_page");
require("mixins/sortable_item_list");
require("mixins/ajax_form");
require("mixins/icon_tab");
require("mixins/edit_step");
require("mixins/convert_ace");
require("mixins/step_list");

var MixinController = new function()
{
    this.intialiseControllers = function()
    {
        $("[data-mixin]").each( function() {
            var controller = require($(this).attr("data-mixin")).run($(this).data());
        });
    }
}

module.exports = MixinController;
