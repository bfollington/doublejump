$( function() {

    FastClick.attach(document.body);

    if (defined('Select2'))
    {
        $(".js-select2").select2();
    }

    boostrapMods();

    bindSlugFields();

    bindEpicEditorFields();

    bindSortableLists();

    setUpBannerImage();

    bindProgressBarResize();
});





/**
 * %BOOTSTRAP MODS
 */


function boostrapMods()
{
    $('[rel=tooltip]').tooltip();
    $('[rel=popover]').popover();
    $('[rel=popover]').click( function (e) { e.preventDefault(); } );
    $('[rel=popover][data-trigger=hover]').off("click");

    // ADD SLIDEDOWN ANIMATION TO DROPDOWN //
    $('.dropdown').on('show.bs.dropdown', function(e){
        $(this).find('.dropdown-menu').first().stop(true, true).slideDown(100);
    });

    // ADD SLIDEUP ANIMATION TO DROPDOWN //
    $('.dropdown').on('hide.bs.dropdown', function(e){
        $(this).find('.dropdown-menu').first().stop(true, true).slideUp(100);
    });
}





/**
 * %PROGRESS BAR
 */

function updateProgressBars()
{
    $(".progress-list-wrapper .progress").each(function() { 

        var
        $this = $(this),
        $parent = $(this).parent(),
        $first = $parent.find("ul.progress-list li:first a"),
        $last = $parent.find("ul.progress-list li.current-step a");

        $(this).css("width", $last.offset().left - $first.offset().left); 
        $(this).css("left", $first.position().left + 2); 
        $(this).css("top", $first.position().top - 1); 

    } );   
}

function bindProgressBarResize()
{
    updateProgressBars();
    $(window).resize( updateProgressBars );
}




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




function setUpBannerImage()
{
    $(".banner-image").each( function() {
        var $this = $(this);

        $this.css("background-image", "url(" + $this.attr("data-background") + ")");
    });
}




/**
 * %MARKDOWN EDITOR SETUP
 */

function bindEpicEditorFields()
{
    if (defined('EpicEditor') && $("#epiceditor-target").length > 0) {

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
                preview: 'themes/preview/github.css',
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

    if (jQuery().sortable)
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
                                        getTemplate("_lesson_list_entry"), 
                                        {
                                            "item-text": $readSelectionFrom.find('option:selected').text(),
                                            "field-name": hiddenField,
                                            "field-value": $readSelectionFrom.val(),
                                        }
                                    )
                                );

            bindSortableLists();
        });

    }
}



/**
 *  %TEMPLATES
 */


function getTemplate(name)
{
    return $("#" + name + "_template").html();
}

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