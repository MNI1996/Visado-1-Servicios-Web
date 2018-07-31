const express = require('express');
const router = express.Router();

var id = 1;


//POST DE UN ALBUM 
router.post('/', (req, res, next) => {
    //select del id del artista
    /*if(la respuesta de la consulta no tiene elementos){
        res.status(404).json({errorCode : "RELATED_RESOURCE_NOT_FOUND"})
    }else{*/
    //insert del album
    //select para sacar la id del album
    const artist = {
        id : id,
        name : req.body.name,
        year : req.body.year,
        tracks : []
    };
    res.status(201).json({
        message : 'the artist was add',
        attechedAlbum: album
    }); 
    id = id +1; // la id de los albums harcodeado 
    //}
});

//GET de un album por id
router.get('/:albumId',(req, res, next)=>{
    const id = req.params.artistId;
    // select * from table
        /*if (la respuesta de la query es vacia){
        res.status(404).json({errorCode : "errorCode: "RESOURCE_NOT_FOUND""});
    }
    */
        res.status(200).json({
            message : 'toma el parametro id',
            id : id
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