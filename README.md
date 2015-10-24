koa-nunjucks-render
------------

Fast koa middleware for using nunjucks, that allows you to easily and efficiently render nunjucks templates.


If you're using nunjucks with koa, you'll find a few notable improvements over koa-views

* Faster
* Does not overwrite some of the rendering context variables (e.g. 'engine', 'cache')
* Directly uses nunjucks, so you have to learn the abstraction idiosyncrasies.
   Like for instance when using koa-views there's two layers of caching, one for
   directly rendered file, but the included files use nunjucks caching. By default
   in development their behaviors diverge (nunjucks caches all files, but
     koa-views reloads the top level file each load).

Install
=======

    npm install --save koa-nunjucks-render


Example usage:

    var nunjucks = require('koa-nunjucks-render');

    app.use(nunjucks('views', {
      ext: '.html',
      noCache: process.env.NODE_ENV === 'development',
      throwOnUndefined: true
    }));

Note: the configuration object is passed directly to `nunjucks`. The only additional
configuration option is the (optional) `ext` which allows you to specify a common suffix to your templates.

And using it is also very clean:

      app.use(function*() {
        yield this.render('template', {
             message: 'Hello World!',
             engine: 'Thomas The Tank'
             helicopter: true
           });
      });
