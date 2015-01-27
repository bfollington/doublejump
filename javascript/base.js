// base.js binds UI stuff and initialises some important bits

var mathjax = false;
window.doublejump = {};

$( function() {

    // Remove no-js class to signify that we... uh... have js
    $("html").first().removeClass("no-js");

    // Configure select2 when the plugin is present
    if (defined('Select2'))
    {
        $(".js-select2").select2();
    }

    //Configure lazy loading of images when the plugin is present
    //Only if we are on the appropriate page, need to used defined? util
    if (jQuery().lazyload)
    {
        $("img.lazy").lazyload(
        {
            threshold : 200
        });
    }

    // Add a book icon to every definition link in the body of the step
    $(".step-body a[rel='definition']").each( function() {

        $(this).html($(this).html() + ' <i class="fa fa-book"></i>');

        if ( typeof $(this).attr("title") == "undefined")
        {
            $(this).attr("title", "Show Definition");
        }

        $(this).tooltip();

    });

    // Add tooltips to comment links
    $(".step-body .comment a").tooltip();

    // Add icons to external links
    $(".step-body a[href*='http']").each( function() {

        $(this).html($(this).html() + ' <i class="fa fa-external-link"></i>');

        if ( typeof $(this).attr("title") == "undefined")
        {
            $(this).attr("title", $(this).attr("href").trunc(50));
        }

        $(this).attr("target", "new");

        $(this).tooltip({placement: "top"});

    });

    //Include mathjax if needed
    if ($("div:contains('{\\[')").length > 0 || $("div:contains('\\(')").length > 0)
    {

        mathjax = true;

        (function () {
          var head = document.getElementsByTagName("head")[0], script;
          script = document.createElement("script");
          script.type = "text/x-mathjax-config";
          script[(window.opera ? "innerHTML" : "text")] =
            "MathJax.Hub.Config({\n" +
            "});"
          head.appendChild(script);
          script = document.createElement("script");
          script.type = "text/javascript";
          script.src  = "http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML";
          head.appendChild(script);
        })();
    }

});

function evalIfFunction(obj, attr)
{
    if (typeof obj[attr] == "function")
    {
        return obj[attr]();
    } else if (typeof obj.get(attr) == "string")
    {
        return obj.get(attr);
    } else {
        return "";
    }
}

function compileTemplate($template, attrs)
{
    var $html = $template.clone();
    var $elems = $html.find("[data-link]").toArray();

    if (typeof $html.attr("data-link") != "undefined")
    {
        $elems.unshift($html);
    }

    _.each($elems, function(elem)
    {
        var $el = $(elem);
        var links = $el.attr("data-link");
        var toLink = links.split(",");

        $.each(toLink, function(index, property)
        {
            var trimmed = property.trim();
            var splitTerm = trimmed.split("<-");
            var attr = splitTerm[0];
            var valueName = splitTerm[1];

            var specialAttrs = {
                "extraClass": function($el) {
                    $el.addClass(evalIfFunction(attrs, valueName));
                },
                "hide": function($el) {
                    if (evalIfFunction(attrs, valueName))
                    {
                        $el.hide();
                    }
                },
                "show": function($el) {
                    if (!evalIfFunction(attrs, valueName))
                    {
                        $el.hide();
                    }
                },
                "text": function($el) {
                    $el.text(evalIfFunction(attrs, valueName));
                },
                "html": function($el) {
                    $el.html(evalIfFunction(attrs, valueName));
                }
            };



            if (attr in specialAttrs)
            {
                specialAttrs[attr]($el);
            } else {
                if (evalIfFunction(attrs, valueName) != null)
                {
                    $el.attr(attr, evalIfFunction(attrs, valueName));
                }

            }
        });

        $el.removeAttr("data-link");
        $el.attr("data-linked", "true");
    });

    return $html.clone().wrap("<div/>").parent().html();
}

function _template(html)
{
    return $(html);
}
