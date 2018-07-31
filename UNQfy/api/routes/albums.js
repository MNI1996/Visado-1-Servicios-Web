const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const Album = require('../models/albums');
const Artist = require('../models/artist');

//POST body{artistId:"", name:"", year:""}
router.post('/', (req,res,next)=>{
    Artist.findById(req.body.artistId)
    .then(artist => {
        if(!artist){
            return res.status(404).json({
                message:'Artist not found'
            });
        }
        const album = new Album({
            _id: mongoose.Types.ObjectId(),
            artistId: req.body.artistId,
            name: req.body.name,
            year: req.body.year
        });
        return album
        .save()
    }).then(result => {
        console.log(result);
        res.status(201).json({
            message:'the album saved',
            result:result
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

router.get('/:albumId', (req, res, next) => {
    Album.findById(req.params.albumId)
    .exec()
    .then(album => {
        if(!album){
            return res.status(404).json({
                message: 'album not found'
            });
        }
        res.status(200).json({
            album: album
        });
    })
    .catch(err => {
        res.status(500).json({error: err});
    });
});

router.delete('/:albumId', (req, res, next) =>{
    Album.remove({_id: req.params.albumId})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'the album have been deleted',
            id: req.params.albumId
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    });
});

router.get('/',(req,res,next) => {
    Album.find()
    .exec()
    .then(docs => {
        res.status(200).json(docs);
    })
    .catch(err => {
        res.status(500).json({error: err});
    });
});

module.exports = router;