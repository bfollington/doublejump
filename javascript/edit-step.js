var editingStep = new function()
{

    var self = this;
    this.countSubmits = 0;

    this.beginSubmits = function()
    {
        self.countSubmits = 0;

        $(".content form").submit();
    }

    this.contentSubmissionDone = function()
    {
        self.countSubmits += 1;

        console.log(self.countSubmits,  $(".content form").length);
        if (self.countSubmits == $(".content form").length)
        {
            self.finishedSubmissions();
        }
    }

    this.contentSubmissionError = function()
    {
        console.error("Submission of one content block failed.");
        self.countSubmits = 0;
    }

    this.finishedSubmissions = function()
    {
        $("#addStepForm").submit();
    }

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
        aceUtil.convertTextAreas();
        self.bindToolbarButtons();
    }

    this.codeLanguageChange = function()
    {
        $(".code-input-language").change( function () {
            var editor = ace.edit($(this).siblings(".ace_editor")[0]);
            console.log(editor);
            editor.getSession().setMode("ace/mode/" + $(this).val());
        });
    }

    this.bindToolbarButtons = function()
    {
        $(".js-delete-content").off("click");
        $(".js-delete-content").click( function (e) {
            e.preventDefault();
            var confirmation = confirm("Are you sure you want to remove this content block?");

            if (confirmation)
            {
                $(this).closest(".content").remove();
                self.rebuildIdList();
            }
        });

        $(".js-minimise-content").off("click");
        $(".js-minimise-content").click( function (e) {
            e.preventDefault();

            $(this).closest(".content").toggleClass("minimised");
        });
    }

    this.init = function ()
    {
        self.bindAjaxForms();
        self.codeLanguageChange();
        self.rebuildIdList();
        self.bindToolbarButtons();

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

        $(".js-add-math-content").click( function(e) {
            e.preventDefault();
            self.addContentSection("_math");
        });

        $(".js-add-definition-content").click( function(e) {
            e.preventDefault();
            self.addContentSection("_definition");
        });

        $(".js-add-two-cols-content").click( function(e) {
            e.preventDefault();
            self.addContentSection("_two_cols");
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
                    self.contentSubmissionDone();
                } else {
                    self.contentSubmissionError();
                }
            },
            error: function (data) {
                console.error(":(");
                self.contentSubmissionError();
            }
        });
    }
}
