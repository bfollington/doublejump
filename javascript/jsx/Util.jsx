export class Util {

}

Util.setTransform = function(el, style)
{
    $(el).css("transform", style);
    $(el).css("-webkit-transform", style);
    $(el).css("-moz-transform", style);
    $(el).css("-ms-transform", style);
    $(el).css("-o-transform", style);
}
