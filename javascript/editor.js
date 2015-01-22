var editor = new function()
{

    var self = this;

    this.ajaxForm = function(selector)
    {
        $(selector).ajaxForm({
            beforeSubmit:  function (data, $form, options) {

            },
            success: function (data, text, xhr, $form) {
                if (data.success)
                {
                    console.log("Form submission returned success, refreshing page...");
                    window.location.reload();
                } else {
                    console.error("Form submission returned failure");
                }
            },
            error: function (data) {
                console.error("Form submission failed");
            }
        });
    }

}
