// epiceditor-config.js configures the epic editor backend fields
// UNUSED DO NOT CALL STUFF


var editor;

function bindEpicEditorFields()
{
    if (defined('EpicEditor') && $(".epiceditor-target").length > 0) {

        $(".epiceditor-target").each( function() {
            bindEpicEditorField($(this));
        });
    }
}

function bindEpicEditorField($el)
{
    console.log($el.find(".epiceditor"));

    var opts = {
        textarea: $el[0],
        container: $el.siblings(".epiceditor")[0],
        basePath: '/javascripts/epiceditor/',
        clientSideStorage: false,
        localStorageName: 'epiceditor',
        useNativeFullscreen: true,
        parser: marked,
        file: {
            name: 'epiceditor',
            defaultContent: '',
            autoSave: 100
        },
        theme: {
            base: 'themes/base/epiceditor.css',
            preview: 'themes/preview/github.css',
            editor: 'themes/editor/epic-dark.css'
        },
        focusOnLoad: false,
        string: {
            togglePreview: 'Toggle Preview Mode',
            toggleEdit: 'Toggle Edit Mode',
            toggleFullscreen: 'Enter Fullscreen'
        },
        autogrow: true,
        minHeight: 512

    }

    editor = new EpicEditor(opts).load();
}
