var editingStep = new function()
{

    var self = this;

    this.rebuildIdList = function()
    {
        // Clear the existing data
        $(".content-ids").html("");

        $(".contents .content .id-field").each( function () {

            var template = format( getTemplate("_step_content_id_entry"), {"id": $(this).val() });
            $(".content-ids").append(template);

        });
    }

    this.init = function ()
    {
        self.bindAjaxForms();

        $(".js-add-markdown-content").click( function(e) {
            e.preventDefault();
            console.log("Test");

            var template = getTemplate("_markdown");

            $(".contents").append(template);

            bindEpicEditorField($(".contents .markdown-content .epiceditor-target").last());
            self.bindAjaxForms();
        });

        $(".js-add-code-content").click( function(e) {
            e.preventDefault();

            var template = getTemplate("_code");

            $(".contents").append(template);
            self.bindAjaxForms();
        });

    }

    this.bindAjaxForms = function ()
    {
        $(".content form").off();
        $(".content form").ajaxForm({
            beforeSubmit:  function () {

            },
            success: function (data, text, xhr, $form) {
                if (data.success)
                {
                    $form.find(".id-field").val(data.id);
                    self.rebuildIdList();
                }
            },
            error: function (data) {
                console.error(":(");
            }
        });
    }
}
