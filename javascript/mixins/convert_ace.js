var aceUtil = require("ace");

function run(opts)
{
    aceUtil.convertTextAreas(opts.selector);
}

module.exports = {run: run};
