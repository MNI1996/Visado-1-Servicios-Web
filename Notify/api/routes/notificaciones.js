const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/user');
const Suscripcion = require('../models/suscripcion');


router.get('/allusers', (req, res, next) =>{
    User.find().exec()
    .then(docs => { console.log(docs);
        res.status(200).json(docs);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    });
});

//{artistId, subject, message, from}
router.post('/notify', (req,res,next)=>{
    const subject = req.body.subject;
    const message = req.body.message;
    const from = req.body.from;
    notificar(subject, message, from);
});

//GET busca y responde con el usuario cuyo email es igual al pasado por parametro// anda
router.get('/findAnUser=:anUserEmail', (req, res, next) => {
    const email = req.params.anUserEmail;
    User.find({email : email}, (err, suscripciones) => {
        if(err){
            res.status(500).json({error:err});
        }
        return res.status(200).json({
            message:'the suscricpcion has been fuond',
            result: {
                suscripcion: suscripciones
            }
        })
    });
});

//POST agrega un usuario a la api pasado como parametro // anda
router.post('/addUser', (req, res, next) => {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        userName: req.body.userName,
        email: req.body.email
    })
    user.save()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: 'user added',
            result: result
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: {
               error: err 
            }            
        })
    }); 
});

//POST agrega el id de un artista al usuario al que pertenece el email pasado por parametro //anda
router.post('/suscribe', (req, res, next) => {
    const artistId = req.body.artistId;
    const suscriptcion = new Suscripcion({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        artistId: artistId
    });
    suscriptcion.save()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: 'the user with that email has suscribe to an artist',
            result: result
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

//DELETE elimina al usuario cuyo email(parametro) es igual al del usuario anda
router.delete('/unsuscribe=:anEmail', (req, res, next) => {
    const email = req.params.anEmail;
    Suscripcion.remove({email: email})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'the user with that email has deleted'
        })
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({error:err});
    });
});

//GET retorna un json con el artistId del body y una lista de los usuarios(que siguen al artista)
router.get('/suscriptions=:artistId', (req, res, next) => {
    const artistId = req.params.artistId;
    Suscripcion.find({artistId : artistId}, (err, suscripciones) => {
        if(err){
            res.status(500).json({error:err});
        }
        return res.status(200).json({
            message:'the suscricpcion has been fuond',
            result: {
                artistId: artistId,
                email: suscripciones.map(suscriptcion => suscriptcion.email)
            }
        })
    });
});

router.get('/all', (req, res, next) =>{
    Suscripcion.find().exec()
    .then(docs => { console.log(docs);
        res.status(200).json(docs);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    });
});

router.delete('/suscriptions', (req,res,next)=>{
    const artistId = req.body.artistId;
    Suscripcion.remove({artistId : artistId}, (err, suscripciones) =>{
        if(err){
            res.status(500).json({
                error:err
            })
        }
        return res.status(200).json({
            artistId:artistId,
        });
        
    });
});

function notificar(subject, message, from, emails){
    const nodemailer = require('nodemailer');
    // create reusable transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com', // server para enviar mail desde gmail
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
        user: 'axel.lopez.garabal@gmail.com',
        pass: '38079570A',
        },
    });
    // setup email data with unicode symbols
    const mailOptions = {
        from: from, // sender address
        to: 'axel.lopez.garabal@gmail.com', // list of receivers
        subject: subject,
        text: message, // plain text body
        html: '<b>Hello world?</b>' // html body
    };
    // enviando mail con callbacks
    transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log(error);
    } else {
        console.log(info);
    }
});
}

module.exports = router;