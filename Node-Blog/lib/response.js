res.render = function render(view, options, callback) {
  var app = this.req.app;
  var opts = options || {};
  // merge res.locals
  opts._locals = self.locals;
  // render
  app.render(view, opts, done);
};