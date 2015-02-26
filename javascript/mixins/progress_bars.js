var progress = require("progress-bar");

var ProgressBars = new function()
{
    this.run = function(opts)
    {
        progress.initHorizontalBars();
        progress.bindProgressBarResize();
        progress.initVerticalBars();
    }
};

module.exports = ProgressBars;
