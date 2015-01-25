// slug-fields.js powers slugifying and lower-casing of fields into another field

var slug = new function()
{
    var self = this;

    self.bindSlugFields = function()
    {
        $(".js-slug").keyup( function() {

            var targetId = "#" + $(this).attr("data-object") + "_" + $(this).attr("data-target");

            $(targetId).val( convertToSlug( $(this).val() ) );

        });
    }

    self.slugify = function(el, slugEl)
    {
        $el = $(el);
        $slugEl = $(slugEl);

        $el.keyup( function() {

            $slugEl.val( convertToSlug( $(this).val() ) );

        });
    }

    self.bindLowercaseFields = function()
    {
        $(".js-lowercase").keyup( function() {

            var targetId = "#" + $(this).attr("data-object") + "_" + $(this).attr("data-target");

            $(targetId).val( convertToLowercase( $(this).val() ) );

        });
    }


}

slug.bindSlugFields();
slug.bindLowercaseFields();
