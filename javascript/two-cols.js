var twoCols = new function()
{

    var self = this;

    this.repositionColumns = function()
    {

        $(".two-cols").each( function () {
            var col1 = $(this).next();
            var col2 = $(this).next().next();

            col1.detach().appendTo($(this).find(".col1"));
            col2.detach().appendTo($(this).find(".col2"));
        });
    }

}

twoCols.repositionColumns();
