"use strict";

var express = require("express");
var router = express.Router();
var Data = require("../models/data");
var User = require('../models/user');

router.get('/home', function (req, res) {
   Data.find({}, function (err, data) {
      var sandroData = { meti: 0 };
      var khvedelaData = { meti: 0 };
      var iashaData = { meti: 0 };
      var bojaData = { meti: 0 };
      var abuashviliData = { meti: 0 };
      var likaData = { meti: 0 };
      var mariData = { meti: 0 };
      var baqroData = { meti: 0 };

      data.forEach(function (packs) {
         if (packs.author.fullname === 'Sandro Suladze') {
            if (packs.pack === 'METI 25') {
               sandroData.meti = sandroData.meti + 1;
               sandroData.data = Object.keys(data).length - sandroData.meti;
            }
         }
      });
      data.forEach(function (packs) {
         if (packs.author.fullname === 'Davit Khvedelidze') {
            if (packs.pack === 'METI 25') {
               khvedelaData.meti = khvedelaData.meti + 1;
               khvedelaData.data = Object.keys(data).length - khvedelaData.meti;
            }
         }
      });
      data.forEach(function (packs) {
         if (packs.author.fullname === 'Salo Iashvili') {
            if (packs.pack === 'METI 25') {
               iashaData.meti = iashaData.meti + 1;
               iashaData.data = Object.keys(data).length - iashaData.meti;
            }
         }
      });
      data.forEach(function (packs) {
         if (packs.author.fullname === 'Salo Bozhadze') {
            if (packs.pack === 'METI 25') {
               bojaData.meti = bojaData.meti + 1;
               bojaData.data = Object.keys(data).length - bojaData.meti;
            }
         }
      });
      data.forEach(function (packs) {
         if (packs.author.fullname === 'Tornike Abuashvili') {
            if (packs.pack === 'METI 25') {
               abuashviliData.meti = abuashviliData.meti + 1;
               abuashviliData.data = Object.keys(data).length - abuashviliData.meti;
            }
         }
      });
      data.forEach(function (packs) {
         if (packs.author.fullname === 'Lika Maisuradze') {
            if (packs.pack === 'METI 25') {
               likaData.meti = likaData.meti + 1;
               likaData.data = Object.keys(data).length - likaData.meti;
            }
         }
      });
      data.forEach(function (packs) {
         if (packs.author.fullname === 'Mariam Misabishvili') {
            if (packs.pack === 'METI 25') {
               mariData.meti = mariData.meti + 1;
               mariData.data = Object.keys(data).length - mariData.meti;
            }
         }
      });
      data.forEach(function (packs) {
         if (packs.author.fullname === 'Tamar Bakradze') {
            if (packs.pack === 'METI 25') {
               baqroData.meti = baqroData.meti + 1;
               baqroData.data = Object.keys(data).length - baqroData.meti;
            }
         }
      });

      if (err) {
         return res.send(err);
      }
      var scores = {};
      scores.sandro = sandroData;
      scores.khvedelidze = khvedelaData;
      scores.iasha = iashaData;
      scores.boja = bojaData;
      scores.abuashvili = abuashviliData;
      scores.lika = likaData;
      scores.mari = mariData;
      scores.baqro = baqroData;
      res.render('landing', { data: data, scores: scores });
   });
});

router.post('/addData', function (req, res) {
   var obj = req.body.data;
   obj.author = {
      fullname: req.user.fullname,
      id: req.user._id
   };

   Data.create(obj, function (err, result) {
      if (err) {
         res.send(err);
      } else {
         res.redirect('/home');
      }
   });
});

router.delete('/data-delete/:id', function (req, res) {
   Data.findByIdAndRemove(req.params.id, function (err, result) {
      if (err) {
         return res.send(err);
      }
      res.redirect('/home');
   });
});

module.exports = router;
//# sourceMappingURL=landing.js.map