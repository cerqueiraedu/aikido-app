'use strict';
const http = require('http');

exports.get = function(req, response) {

  let randori = "<b>randori started...</b></br>";
  let ukes = parseInt(req.params.ukes);
  let ukeAttacking = 1;

  var doTechnique = () => { 
    http.get({
      host: 'localhost', 
      path: '/technique',
      port: 8081
    }, function(res) {
      res.on('data', function(d) {
        randori += d + "</br>";
      });
      res.on('end', function() {
        console.log("technique done");
        if (ukeAttacking < ukes)
        {
          ukeAttacking++;
          doAtemi();
        }
        else
          response.send(randori);
      });
    })
  }
  
  var doAtemi = () => { 
      http.get({
        host: 'localhost', 
        path: '/atemi',
        port: 8080
      }, (res) => {
        res.on('data', function(d) {
          randori += (d + ", ");
        });
        res.on('end', function() {
          doTechnique();
        });
      })
  };

  doAtemi();
};
