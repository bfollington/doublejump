// progress-bar.js powers the progress bar during a lesson

function updateProgressBars()
{
    $(".progress-list-wrapper .progress").each(function() { 

        var
        $this = $(this),
        $parent = $(this).parent(),
        $first = $parent.find("ul.progress-list li:first a"),
        $last = $parent.find("ul.progress-list li.current-step a");

        $(this).css("width", $last.offset().left - $first.offset().left); 
        $(this).css("left", $first.position().left + 2); 
        $(this).css("top", $first.position().top); 

    } );  

    if ( $(".course-progress-node").length > 0 )
    {
        var nodes = getVerticalProgressPoints();

        var
        $first = nodes.first,
        $upto = nodes.upto,
        $last = nodes.last;
        nodeWidth = $first.outerWidth() - 3;

        var $doneBar = $(".vertical-progress-done");
        $doneBar.css("height", $upto.offset().top - $first.offset().top);
        $doneBar.css("left", $first.offset().left + nodeWidth / 2);
        $doneBar.css("top", $first.offset().top + nodeWidth / 2);

        var $toDoBar = $(".vertical-progress-todo");
        $toDoBar.css("height", $last.offset().top - $upto.offset().top);
        $toDoBar.css("left", $upto.offset().left + nodeWidth / 2);
        $toDoBar.css("top", $upto.offset().top + nodeWidth / 2);
    }


}

function getVerticalProgressPoints ()
{
    var
    $first = $(".course-progress-node.first"),
    $upto = $(".course-progress-node.done:last"),
    $last = $(".course-progress-node.last");

    if ($upto.length == 0)
    {
        $upto = $first;
    }

    return {"first" : $first, "upto": $upto, "last": $last};
}

function initVerticalBars()
{
    if ( $(".course-progress-node").length > 0 )
    {
        $("body").prepend("<div class='vertical-progress-done'></div>");
        $("body").prepend("<div class='vertical-progress-todo'></div>");

        var href = $(".course-progress-node").not(".done").first().parent().next().find("a").attr("href");

        $(".course-progress-node").not(".done").first().parent().next().find(".box").prepend("<a href='" + href + "' class='button create-button float-right lets-go'>Let's Go!</div>");
    } 
}

function bindProgressBarResize()
{
    updateProgressBars();
    $(window).resize( updateProgressBars );
}

bindProgressBarResize();
initVerticalBars();