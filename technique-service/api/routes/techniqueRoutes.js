'use strict';

module.exports = function(app) {
  const techniqueController = require('../controllers/techniqueController.js');
  app.route('/')
  .get(techniqueController.get);  
};