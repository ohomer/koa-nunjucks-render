var nunjucks = require('nunjucks');

// opts are passed direct to nunjucks
// with an additional 'ext' for extention
//  (a common suffix for templates)
module.exports = function(path, opts) {
  nunjucks.configure(path, opts);

  var ext = opts.ext || '';

  return function*(next) {
    var self = this;

    this.render = function(view, context) {
      return new Promise(function(resolve, reject) {
        nunjucks.render(view+ext, context, function(err, body) {
          if (err)
            return reject(err);
          self.body = body;
          resolve();
        });
      });
    };

    yield* next;
  }
}
