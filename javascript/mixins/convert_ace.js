var aceUtil = require("aceUtil");

function run(opts)
{
    aceUtil.convertTextAreas(opts.selector);
}

module.exports = {run: run};
