var React = require("react");

var Util = {};

Util.clone = function(obj) {
    var ret = {};

    $.extend(ret, obj);

    return ret;
};

Util.read = function(func)
{
    try {
        return func();
    } catch (err) {

    }
};

Util.setTransform = function(el, style)
{
    $(el).css("transform", style);
    $(el).css("-webkit-transform", style);
    $(el).css("-moz-transform", style);
    $(el).css("-ms-transform", style);
    $(el).css("-o-transform", style);
};

Util.getCSRF = function() {
    return {
        "param": $("meta[name=csrf-param]").attr("content"),
        "token": $("meta[name=csrf-token]").attr("content")
    };
};

Util.getCSRFFormField = function() {
    var csrf = Util.getCSRF();
    return <input type="hidden" name={csrf.param} value={csrf.token} />;
};

Util.transformMongoId = function(obj) {
    if (obj["_id"]) {
        if (obj["_id"]["$oid"]) {
            obj["id"] = obj["_id"]["$oid"];
        }
    }
};

module.exports = Util;
