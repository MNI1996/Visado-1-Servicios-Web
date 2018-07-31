const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Artist = require('../models/artist');


//POST body{"name":"", "country": ""}
router.post('/', (req, res, next) =>{
    const name = req.body.name 
    const newArtist = new Artist({
        _id: new mongoose.Types.ObjectId(),
        name: name.toLowerCase(),
        country: req.body.country,
        albums: []
    })
    newArtist.save()
    .then(result => {
        res.status(200).json({
            message: 'a new artist has been added',
            object: newArtist
        });
    })
    .catch(err => {
        res.status(500).json({
            error : err
        });
    });

});

router.get('/findById=:artistId', (req, res, next) =>{
    const paramId = req.params.artistId;
    Artist.findById(paramId)
    .exec()
    .then(doc => {
        if(doc){
            res.status(200).json(doc);
        }
        else{
            res.status(404).json({
                message : 'no valid entry found for provided ID',
            });
        }
    })
    .catch(err =>{ 
        res.status(500).json({error: err});
    });

});

router.get('/findByName=:name', (req,res,next) => {
    const param = (req.params.name)//.toLowerCase();
    var query = Artist.find({"name":{ $regex:'.*'}});
    //var query = Artist.find();
    query.exec(function(err, result){
        if(err) {res.status(500).json({estado: 'falla'});}
        res.status(200).json({resultado: result});
    });
});

router.delete('/:artistId', (req, res, next) =>{
    const id = req.params.artistId;
    Artist.remove({_id : id})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'the artist with that id has been deleted'
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    });
});



module.exports = router;