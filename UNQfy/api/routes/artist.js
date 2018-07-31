const express = require('express');
const router = express.Router();

var id = 1;

//GET all  
router.get('/', (req, res, next) => {
    //select * from tabla
    res.status(200).json({
        message : 'all artist in system'
    });
});
//POST DE UN ARTISTA 
router.post('/', (req, res, next) => {
    //select
    //if (el artista esta en la base de datos){
    //  res.status(409).json({errorCode : "RESOURCE_ALREADY_EXISTS"});
    //}
    //else{
    //insert
    const artist = {
        id : id,
        name : req.body.name,
        country : req.body.country,
        albums : []//deberia llamar a populate album
    };
    res.status(201).json({
        message : 'the artist was add',
        attechedArtist: artist
    }); 
    id = id +1; // la id de los artistas 
    //}
});

//GET de un artista por id
router.get('/:artistId',(req, res, next)=>{
    const id = req.params.artistId;
    // select * from table
    /*if (la respuesta de la query es vacia){
        res.status(404).json({errorCode : "errorCode: "RESOURCE_NOT_FOUND""});
    }
    */
        res.status(200).json({
            message : 'toma el parametro id',
            //el objeto obtenido por la consulta
        });
    //}
});

//GET los artistas que machean por proximidad con el nombre parametro
router.get('/name:artistName',(req, res, next)=>{
    const id = req.params.artistName;
    //select * 
    if (true){
        res.status(200).json({
            message : 'toma el parametro id',
            name : id
        });
    }
});

//DELETE el artista con el id pasado por parametro
router.delete('/:artistId',(req, res, next)=>{
    const id = req.params.artistId;
    //select * from table
        /*if (la respuesta de la query es vacia){
        res.status(404).json({errorCode : "errorCode: "RESOURCE_NOT_FOUND""});
    }
    */
        //delete * from table where id = id
        res.status(200)
    //}
});

module.exports = router;