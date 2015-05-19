// slug-fields.js powers slugifying and lower-casing of fields into another field

var util = require("util/_util");

var slug = new function()
{
    var self = this;

    self.bindSlugFields = function()
    {
        $(".js-slug").keyup( function() {

            var targetId = "#" + $(this).attr("data-object") + "_" + $(this).attr("data-target");

            $(targetId).val( util.convertToSlug( $(this).val() ) );

        });
    }

    self.slugify = function(el, slugEl)
    {
        $el = $(el);
        $slugEl = $(slugEl);

        $el.keyup( function() {

            $slugEl.val( util.convertToSlug( $(this).val() ) );
            $slugEl.trigger("change");

        });
    }

    self.bindLowercaseFields = function()
    {
        $(".js-lowercase").keyup( function() {

            var targetId = "#" + $(this).attr("data-object") + "_" + $(this).attr("data-target");

            $(targetId).val( util.convertToLowercase( $(this).val() ) );

        });
    }


}

module.exports = slug;
