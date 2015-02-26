var sharing = require("sharing-progress");

function run(opts)
{
    sharing.bindImageClick();
    sharing.bindSharingImageForm();
    sharing.bindPageResize();
    sharing.bindLikeImage();
}

module.exports = {run: run};
