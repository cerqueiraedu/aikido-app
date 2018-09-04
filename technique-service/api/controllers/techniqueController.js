'use strict';
const getRandomItem = require('../helpers/getRandomItem.js');

exports.get = function(req, res) {
    let techniques = ["ikkyo", "nikyo", "sankyo", "yonkyo", "gokyo", "kotegaeshi", "irimi nague", "sumi otoshi", "koshi nage", "shiho nage", "kokyu nage"];
    let direction = ["omote", "ura"];
    let nague = "nague applies " + getRandomItem.get(techniques) + " " + getRandomItem.get(direction);;
    res.send(nague);
};


