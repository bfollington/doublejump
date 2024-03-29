function getTemplate(name)
{
    return $("#" + name + "_template").html();
}

function templateHtml(name)
{
    return $("[data-template=" + name + "]").html();
}

function format(html, variables)
{
    for (var k in variables)
    {
        var re = new RegExp("{{#" + k + "}}", 'g');

        html = html.replace(re, variables[k]);
    }

    return html;
}

module.exports = {
    getTemplate: getTemplate,
    templateHtml: templateHtml,
    format: format
}
