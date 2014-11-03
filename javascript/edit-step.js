var editingStep = new function()
{

    this.init = function ()
    {
        $(".js-add-markdown-content").click( function(e) {
            e.preventDefault();
            console.log("Test");
        });
    }
}
