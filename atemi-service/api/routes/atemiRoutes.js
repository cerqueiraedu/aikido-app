'use strict';

module.exports = function(app) {
  const atemiController = require('../controllers/atemiController.js');
  app.route('/atemi')
    .get(atemiController.get);  
};