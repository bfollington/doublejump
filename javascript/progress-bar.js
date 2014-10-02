// progress-bar.js powers the progress bar during a lesson

var progress = new function()
{
    var self = this;
    self.updateProgressBars = function()
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
            var nodes = self.getVerticalProgressPoints();

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


    self.getVerticalProgressPoints = function()
    {
        var
        $first = $(".course-progress-node.first"),
        $upto = $(".course-progress-node.done:last"),
        $last = $(".course-progress-node:last");

        if ($upto.length == 0)
        {
            $upto = $first;
        }

        return {"first" : $first, "upto": $upto, "last": $last};
    }


    self.initVerticalBars = function()
    {
        if ( $(".course-progress-node").length > 0 )
        {
            $("body").prepend("<div class='vertical-progress-done'></div>");
            $("body").prepend("<div class='vertical-progress-todo'></div>");

            var $selector = $(".course-progress-node").not(".done").first().parent().next();

            var href = $selector.find("a").attr("href");

            $selector.find(".box").prepend("<a href='" + href + "' class='button create-button float-right lets-go'>Let's Go!</div>");
        } 
    }

    self.initHorizontalBars = function()
    {
        $(".progress-list-wrapper").prepend("<div class='progress'></div>");
    }

    self.bindProgressBarResize = function()
    {
        self.updateProgressBars();
        window.setTimeout( self.updateProgressBars, 1000 );

        if ($(".course-progress-node").length > 0)
        {
            window.setInterval( self.updateProgressBars, 100 );
        }

        $(window).resize( self.updateProgressBars );

        // If we are running CSS animations, then we need to keep the progress bars up to date
        if (supportsTransitions())
        {
            self.runBarUpdate();    
        }
        
    }

    self.barUpdateCount = 0;

    self.runBarUpdate = function() {
        self.barUpdateCount++;

        // Only update 100 frames of animation
        if (self.barUpdateCount < 100)
        {
            requestAnimationFrame(self.runBarUpdate);
            self.updateProgressBars();
        }
    }
}

progress.initHorizontalBars();
progress.bindProgressBarResize();
progress.initVerticalBars();