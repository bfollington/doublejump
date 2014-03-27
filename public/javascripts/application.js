$( function() {

    bindSlugFields();

    bindEpicEditorFields();

    bindSortableLists();

});




/**
 * %SLUG FIELDS
 */

function bindSlugFields()
{
    $(".js-slug").keyup( function() {

        var targetId = "#" + $(this).attr("data-object") + "_" + $(this).attr("data-target");

        $(targetId).val( convertToSlug( $(this).val() ) );

    });
}




/**
 * %MARKDOWN EDITOR SETUP
 */

function bindEpicEditorFields()
{
    if (defined('EpicEditor')) {

        var opts = {
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
}





/**
 * %SORTABLE LISTS
 */

function bindSortableLists()
{

    // Don't double up our event handlers
    $(".js-sortable").off();    
    $(".js-sortable-delete-link").off();    
    $(".js-sortable-add-new").off();    


    // Set up the list
    $(".js-sortable").sortable();


    // Bind our delete links
    $(".js-sortable-delete-link").bind('click', function(e) {
        e.preventDefault();
        $(this).parent().remove();
    });


    // Add a new row to the list
    $(".js-sortable-add-new").click( function(e) {

        var $readSelectionFrom = $( $(this).attr("data-read-selection-from") ),
            hiddenField = $(this).attr("data-hidden-field-name"),
            $targetList = $( $(this).attr("data-target-list") );

        e.preventDefault();

        $targetList.append( format(
                                    lessonListEntryTemplate, 
                                    {
                                        "item-text": $readSelectionFrom.text(),
                                        "field-name": hiddenField,
                                        "field-value": $readSelectionFrom.val(),
                                    }
                                )
                            );

        bindSortableLists();
    });
}



/**
 *  %TEMPLATES
 */

var lessonListEntryTemplate = [
"<li>",
    "{{#item-text}}",
    "<input name='{{#field-name}}' value='{{#field-value}}' type='hidden'>",
    "<a class='js-sortable-delete-link' href='#'>Delete</a>",
"</li>",
].join("\n");




/**
 * %UTILITY FUNCTIONS
 */

function format(html, variables)
{
    for (var k in variables)
    {
        var re = new RegExp("{{#" + k + "}}", 'g');

        html = html.replace(re, variables[k]);
    }

    return html;
}

function defined(variable)
{
    return typeof window[variable] != "undefined";
}

function convertToSlug(Text)
{
    return Text
        .toLowerCase()
        .replace(/[^\w ]+/g,'')
        .replace(/ +/g,'-');
}