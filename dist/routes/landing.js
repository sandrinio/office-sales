"use strict";

var express = require("express");
var router = express.Router();
var Data = require("../models/data");
var User = require('../models/user');
var middleware = require('../middleware');
var TuristSim = require('../models/turist');

router.get('/home', middleware.isLoggedIn, function (req, res) {
   Data.find({}, function (err, data) {
      var sandroData = { meti: 0, data: 0 };
      var khvedelaData = { meti: 0, data: 0 };
      var iashaData = { meti: 0, data: 0 };
      var bojaData = { meti: 0, data: 0 };
      var abuashviliData = { meti: 0, data: 0 };
      var likaData = { meti: 0, data: 0 };
      var mariData = { meti: 0, data: 0 };
      var baqroData = { meti: 0, data: 0 };

      data.forEach(function (packs) {
         if (packs.author.fullname === 'Sandro Suladze') {
            sandroData.data = sandroData.data + 1;
            if (packs.pack === 'METI 25') {
               sandroData.meti = sandroData.meti + 1;
            }
         }
      });
      data.forEach(function (packs) {
         if (packs.author.fullname === 'Davit Khvedelidze') {
            khvedelaData.data = khvedelaData.data + 1;
            if (packs.pack === 'METI 25') {
               khvedelaData.meti = khvedelaData.meti + 1;
            }
         }
      });
      data.forEach(function (packs) {
         if (packs.author.fullname === 'Salo Iashvili') {
            iashaData.data = iashaData.data + 1;
            if (packs.pack === 'METI 25') {
               iashaData.meti = iashaData.meti + 1;
            }
         }
      });
      data.forEach(function (packs) {
         if (packs.author.fullname === 'Salome Bozhadze') {
            bojaData.data = bojaData.data + 1;
            if (packs.pack === 'METI 25') {
               bojaData.meti = bojaData.meti + 1;
            }
         }
      });
      data.forEach(function (packs) {
         if (packs.author.fullname === 'Tornike Abuashvili') {
            abuashviliData.data = abuashviliData.data + 1;
            if (packs.pack === 'METI 25') {
               abuashviliData.meti = abuashviliData.meti + 1;
            }
         }
      });
      data.forEach(function (packs) {
         if (packs.author.fullname === 'Lika Maisuradze') {
            likaData.data = likaData.data + 1;
            if (packs.pack === 'METI 25') {
               likaData.meti = likaData.meti + 1;
            }
         }
      });
      data.forEach(function (packs) {
         if (packs.author.fullname === 'Mariam Misabishvili') {
            mariData.data = mariData.data + 1;
            if (packs.pack === 'METI 25') {
               mariData.meti = mariData.meti + 1;
            }
         }
      });
      data.forEach(function (packs) {
         if (packs.author.fullname === 'Tamar Bakradze') {
            baqroData.data = baqroData.data + 1;
            if (packs.pack === 'METI 25') {
               baqroData.meti = baqroData.meti + 1;
            }
         }
      });

      if (err) {
         return res.send(err);
      }
      Data.find({}).limit(40).sort('-date').exec(function (err, allData) {
         if (err) {
            res.send(err);
         } else {
            TuristSim.find({}, function (err, turistData) {
               if (err) {
                  res.send(err);
               } else {
                  var scores = {};
                  scores.sandro = sandroData;
                  scores.khvedelidze = khvedelaData;
                  scores.iasha = iashaData;
                  scores.boja = bojaData;
                  scores.abuashvili = abuashviliData;
                  scores.lika = likaData;
                  scores.mari = mariData;
                  scores.baqro = baqroData;

                  res.render('landing', { allData: allData,
                     scores: scores,
                     turistData: turistData
                  });
               }
            });
         }
      });
   });
});

router.get('/home/:id', function (req, res) {
   User.findById(req.user._id, function (err, user) {
      if (err) {
         res.send(err);
      } else {
         Data.find({ 'author.fullname': user.fullname }, function (err, data) {
            if (err) {
               res.send(err);
            } else {
               res.render('myData', { data: data });
            }
         });
      }
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

router.post('/addSimQuantity', function (req, res) {
   var obj = { quantity: req.body.quantity };
   TuristSim.findByIdAndUpdate('590cba62fa11a629dc86fe09', obj, function (err, result) {
      if (err) {
         res.send(err);
      } else {
         res.redirect('back');
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