require('newrelic');
'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const techniqueRoutes = require('./api/routes/techniqueRoutes'); 
var techniqueService = express();

techniqueService.use(bodyParser.json());

techniqueRoutes(techniqueService);  
techniqueService.listen(8081, function () {
  console.log('Aikido Technique API listening on port 8081!');
});

