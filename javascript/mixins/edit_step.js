var AjaxFormView = require("backbone/ajax_view");
var ComposeStepView = require("editor/step_view").ComposeStepView;
var ComposeStepContentView = require("editor/step_view").ComposeStepContentView;

function run()
{
    new AjaxFormView({
        el: $("#updateStepOrderForm")
    });

    var composeStepView = new ComposeStepView({el: $(".create-step-form")});

    $(".content").each( function() {
        console.log($(this));
        new ComposeStepContentView({el: $(this), parent: composeStepView});
    });

    $(".js-save-step").click( function (e)
    {
        e.preventDefault();

        $("#updateStepOrderForm").submit();
        composeStepView.beginSubmits();
    });
}

module.exports = {run: run};
