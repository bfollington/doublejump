// slug-fields.js powers slugifying and lower-casing of fields into another field

function bindSlugFields()
{
    $(".js-slug").keyup( function() {

        var targetId = "#" + $(this).attr("data-object") + "_" + $(this).attr("data-target");

        $(targetId).val( convertToSlug( $(this).val() ) );

    });
}

bindSlugFields();

function bindLowercaseFields()
{
    $(".js-lowercase").keyup( function() {

        var targetId = "#" + $(this).attr("data-object") + "_" + $(this).attr("data-target");

        $(targetId).val( convertToLowercase( $(this).val() ) );

    });
}

bindLowercaseFields();