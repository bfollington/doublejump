var aceUtil = new function()
{
    this.convertTextAreas = function() {

        $('[data-editor]').each(function () {
            var el = $(this);

            if (el.prev().is(".ace_editor"))
            {
                console.log("Already an ace editor");
                return;
            }

            var mode = el.data('editor');

            var editDiv = $('<div>', {
                position: 'absolute',
                width: el.width(),
                height: Math.max(64, el[0].scrollHeight),
                'class': el.attr('class')
            }).insertBefore(el);

            el.css('display', 'none');

            var editor = ace.edit(editDiv[0]);

            editor.getSession().setValue(el.text());
            editor.getSession().setMode("ace/mode/" + mode);
            editor.getSession().setUseSoftTabs(false);
            editor.getSession().setUseWrapMode(true);
            editor.setTheme("ace/theme/terminal");

            editor.getSession().on('change', function(e) {
                el.text(editor.getSession().getValue());
            });

        });

    }

}






