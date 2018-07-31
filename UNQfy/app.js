const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const artistRoutes = require('./api/routes/artist');
const albumsRoutes = require('./api/routes/album');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: flase}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Acces-Control-Allow-Origin', '*');
    res.header('Acces-Control-Allow-Headers', '*');
    if(req.method === 'OPTIONS'){
        res.header('Acces-Control-Allow-Methods', 'PUT, POST, DELETE, GET');
        return res.status(200).json({});
    }
});

app.use('/artist', artistRoutes);
app.use('/album', albumsRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error:{
            errorCode : "INTERNAL_SERVER_ERROR",
            message: error.message 
        }
    })
});

module.exports = app;