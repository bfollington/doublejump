require("ui/js/_comment_icon_view");

function run()
{
    $("[data-view-model]").each( function() {
        console.log( $(this).attr("data-view-model") );
        new (require( $(this).attr("data-view-model") ))({el: $(this)});
    });
}

module.exports = run;
