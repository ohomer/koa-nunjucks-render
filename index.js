var nunjucks = require('nunjucks');

// opts are passed direct to nunjucks
// with an additional 'ext' for extention
//  (a common suffix for templates)
module.exports = function(path, opts) {
  var env = nunjucks.configure(path, opts);

  var ext = opts.ext || '';

  var filters = opts.filters || {};
  for (var f in filters) {
    env.addFilter(f, filters[f]);
  }

  var globals = opts.globals || {};
  for (var g in globals) {
    env.addGlobal(g, globals[g]);
  }

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
