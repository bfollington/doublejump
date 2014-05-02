$( function() {

    FastClick.attach(document.body);

    if (defined('Select2'))
    {
        $(".js-select2").select2();
    }

});