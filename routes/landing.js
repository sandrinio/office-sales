const express = require("express");
const router = express.Router();
const Data = require("../models/data");
const User = require('../models/user');

router.get('/home', (req, res) => {
  Data.find({}, function(err, data){
     const sandroData = {meti: 0};
     const khvedelaData = {meti: 0};
     const iashaData = {meti: 0};
     const bojaData = {meti: 0};
     const abuashviliData = {meti: 0};
     const likaData = {meti: 0};
     const mariData = {meti: 0};
     const baqroData = {meti: 0};

     data.forEach(function (packs) {
         if(packs.author.fullname === 'Sandro Suladze'){
            if(packs.pack === 'METI 25'){
              sandroData.meti = sandroData.meti + 1;
              sandroData.data = Object.keys(data).length - sandroData.meti;
            }
         }
     });
     data.forEach(function (packs) {
        if(packs.author.fullname === 'Davit Khvedelidze'){
           if(packs.pack === 'METI 25'){
              khvedelaData.meti = khvedelaData.meti + 1;
              khvedelaData.data = Object.keys(data).length - khvedelaData.meti;
           }
        }
     });
     data.forEach(function (packs) {
        if(packs.author.fullname === 'Salo Iashvili'){
           if(packs.pack === 'METI 25'){
              iashaData.meti = iashaData.meti + 1;
              iashaData.data = Object.keys(data).length - iashaData.meti;
           }
        }
     });
     data.forEach(function (packs) {
        if(packs.author.fullname === 'Salo Bozhadze'){
           if(packs.pack === 'METI 25'){
              bojaData.meti = bojaData.meti + 1;
              bojaData.data = Object.keys(data).length - bojaData.meti;
           }
        }
     });
     data.forEach(function (packs) {
        if(packs.author.fullname === 'Tornike Abuashvili'){
           if(packs.pack === 'METI 25'){
              abuashviliData.meti = abuashviliData.meti + 1;
              abuashviliData.data = Object.keys(data).length - abuashviliData.meti;
           }
        }
     });
     data.forEach(function (packs) {
        if(packs.author.fullname === 'Lika Maisuradze'){
           if(packs.pack === 'METI 25'){
              likaData.meti = likaData.meti + 1;
              likaData.data = Object.keys(data).length - likaData.meti;
           }
        }
     });
     data.forEach(function (packs) {
        if(packs.author.fullname === 'Mariam Misabishvili'){
           if(packs.pack === 'METI 25'){
              mariData.meti = mariData.meti + 1;
              mariData.data = Object.keys(data).length - mariData.meti;
           }
        }
     });
     data.forEach(function (packs) {
        if(packs.author.fullname === 'Tamar Bakradze'){
           if(packs.pack === 'METI 25'){
              baqroData.meti = baqroData.meti + 1;
              baqroData.data = Object.keys(data).length - baqroData.meti;
           }
        }
     });

     if(err){
       return res.send(err)
         }
           let scores = {};
           scores.sandro = sandroData;
           scores.khvedelidze = khvedelaData;
           scores.iasha = iashaData;
           scores.boja = bojaData;
           scores.abuashvili = abuashviliData;
           scores.lika = likaData;
           scores.mari = mariData;
           scores.baqro = baqroData;
         res.render('landing', {data: data, scores: scores})
       })
});

router.post('/addData', (req, res) => {
    const obj = req.body.data;
    obj.author = {
        fullname: req.user.fullname,
        id: req.user._id
  };
    
    Data.create(obj, (err, result) => {
        if(err){
            res.send(err)
        }else{
            res.redirect('/home');
        }
    });
});


router.delete('/data-delete/:id', (req, res) => {
    Data.findByIdAndRemove(req.params.id, (err, result) => {
        if(err){
            return res.send(err)
        }
        res.redirect('/home')
    });
});


module.exports = router;