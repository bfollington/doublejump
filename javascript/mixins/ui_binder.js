require("ui/js/_comment_icon_view");

function run()
{
    $("[data-view-model]").each( function() {
        var vm = $(this).attr("data-view-model");
        $(this).removeAttr("data-view-model");

        new (require(vm))({el: $(this), model: new Backbone.Model($(this).data()) });


    });
}

module.exports = run;
