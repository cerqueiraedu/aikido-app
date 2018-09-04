'use strict';

module.exports = function(app) {
  const randoriController = require('../controllers/randoriController.js');
  app.route('/randori/ukes/:ukes')
  .get(randoriController.get);  
};