// Put your application scripts here

$( function() {


    $(".js-slug").keyup( function() {

        var targetId = "#" + $(this).attr("data-object") + "_" + $(this).attr("data-target");

        $(targetId).val( convertToSlug( $(this).val() ) );

    });

    if (EpicEditor) {

        var opts = {
          container: 'epiceditor',
          textarea: 'epiceditor-target',
          basePath: '/javascripts/epiceditor/',
          clientSideStorage: true,
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
            preview: 'themes/preview/preview-light.css',
            editor: 'themes/editor/epic-dark.css'
          },
          focusOnLoad: false,
          string: {
            togglePreview: 'Toggle Preview Mode',
            toggleEdit: 'Toggle Edit Mode',
            toggleFullscreen: 'Enter Fullscreen'
          },
          autogrow: false
        }

        var editor = new EpicEditor(opts).load();

        $("#epiceditor-target").parent().hide();

    }

});

function convertToSlug(Text)
{
    return Text
        .toLowerCase()
        .replace(/[^\w ]+/g,'')
        .replace(/ +/g,'-');
}