var editingStep = new function()
{

    var self = this;

    this.rebuildIdList = function()
    {
        // Clear the existing data
        console.log("Rebulding id list");
        $(".content-ids").html("");

        $(".contents .content .id-field").each( function () {

            var template = format( getTemplate("_step_content_id_entry"), {"id": $(this).val() });
            $(".content-ids").append(template);

        });
    }

    this.addContentSection = function(template)
    {
        var template = getTemplate(template);

        $(".contents").append(template);

        self.bindAjaxForms();
    }

    this.codeLanguageChange = function()
    {
        $(".code-input-language").change( function () {
            var editor = ace.edit($(this).siblings(".ace_editor")[0]);
            console.log(editor);
            editor.getSession().setMode("ace/mode/" + $(this).val());
        });
    }

    this.init = function ()
    {
        self.bindAjaxForms();
        self.codeLanguageChange();
        self.rebuildIdList();

        $(".js-delete-content").click( function (e) {
            e.preventDefault();

            $(this).closest(".content").remove();
            self.rebuildIdList();
        });

        $(".js-add-markdown-content").click( function(e) {
            e.preventDefault();
            self.addContentSection("_markdown");
        });

        $(".js-add-code-content").click( function(e) {
            e.preventDefault();
            self.addContentSection("_code");
        });

        $(".js-add-hideable-content").click( function(e) {
            e.preventDefault();
            self.addContentSection("_hideable");
        });

    }

    this.bindAjaxForms = function ()
    {
        $(".content form").off();
        $(".content form").ajaxForm({
            beforeSubmit:  function (data, $form, options) {

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
