app.render = function render(name, options, callback) {
  var opts = options;
  var renderOptions = {};
  // merge app.locals
  merge(renderOptions, this.locals);

  // merge options._locals
  if (opts._locals) {
    merge(renderOptions, opts._locals);
  }

  // merge options
  merge(renderOptions, opts);
  tryRender(view, renderOptions, done);
};