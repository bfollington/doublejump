var babel = require('babel');

module.exports = {
  process: function(src, filename) {
    return babel.transform(src, {
        filename: filename,
        stage: 2,
        retainLines: true,
        auxiliaryCommentBefore: "istanbul ignore next",
        loose: ["es6.modules"],
        "optional": [ "es7.decorators" ]
      }).code;
  }
};
