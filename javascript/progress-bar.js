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
}

function bindProgressBarResize()
{
    updateProgressBars();
    $(window).resize( updateProgressBars );
}

bindProgressBarResize();