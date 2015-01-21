// sortable-list.js powers the re-orderable lists for creating steps, lessons, etc.

var sortable = new function()
{
    var self = this;

    this.bindSortableLists = function(opts)
    {
        console.log("HELO");
        if (opts == null)
        {
            opts = {};
            opts.afterDrag = function() {};
        }

        if (jQuery().sortable)
        {

            // Don't double up our event handlers
            $(".js-sortable").off();
            $(".js-sortable-delete-link").off();
            $(".js-sortable-add-new").off();

            opts.onDrop = function($item, container, _super, event)
            {
                $item.removeClass("dragged").removeAttr("style");
                $("body").removeClass("dragging");
                if (opts.afterDrag) opts.afterDrag();
            }


            // Set up the list
            $(".js-sortable").sortable(opts);


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

                // self.bindSortableLists(opts);
            });

        }
    }
}
