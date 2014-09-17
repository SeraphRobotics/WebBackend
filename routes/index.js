'use strict';
module.exports = function(app) {
  var route = {};

  // index.html
  route.index = function(req, res) {
    res.render('portal');
  };

  app.get('/', route.index);
};
