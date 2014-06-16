// base.js binds UI stuff

$( function() {

    //FastClick.attach(document.body);

    $("html").first().removeClass("no-js");

    if (defined('Select2'))
    {
        $(".js-select2").select2();
    }

    //Only if we are on the appropriate page, need to used defined? util
    if (jQuery().lazyload)
    {
        $("img.lazy").lazyload(
        {
            threshold : 200
        });
    }

    $(".step-body a[rel='definition']").each( function() {

        $(this).html($(this).html() + ' <i class="fa fa-book"></i>');

        if ( typeof $(this).attr("title") == "undefined")
        {
            $(this).attr("title", "Show Definition");
        }

        $(this).tooltip();

    });

    $(".step-body .comment a").tooltip();

    $(".step-body a[href*='http']").each( function() {

        $(this).html($(this).html() + ' <i class="fa fa-external-link"></i>');

        if ( typeof $(this).attr("title") == "undefined")
        {
            $(this).attr("title", $(this).attr("href"));
        }

        $(this).attr("target", "new");

        $(this).tooltip();

    });

    //Include mathjax if needed
    if ($("div:contains('$$')").length > 0 || $("div:contains('\\(')").length > 0)
    {
        (function () {
          var script = document.createElement("script");
          script.type = "text/javascript";
          script.src  = "http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML";
          document.getElementsByTagName("head")[0].appendChild(script);
        })();
    }

});