var editingStep = new function()
{

    this.init = function ()
    {
        $(".js-add-markdown-content").click( function(e) {
            e.preventDefault();
            console.log("Test");

            var template = getTemplate("_markdown");

            $(".contents").append(template);

            bindEpicEditorField($(".contents .markdown-content .epiceditor-target").last());
        });

        $(".js-add-code-content").click( function(e) {
            e.preventDefault();

            var template = getTemplate("_code");

            $(".contents").append(template);
        });
    }
}
