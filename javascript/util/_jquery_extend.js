function extendJq()
{
    $.postWithCsrf = function (url, data, success)
    {
        data[$("meta[name=csrf-param]").attr("content")] = $("meta[name=csrf-token]").attr("content");
        $.post(url, data, success);
    };
}

module.exports = extendJq;
