function run()
{
    _.templateSettings = {
        interpolate: /\%\%=(.+?)\%\%/g,
        escape: /\%\%-(.+?)\%\%/g,
        evaluate: /\%\%(.+?)\%\%/g,
    };
}

module.exports = run;
