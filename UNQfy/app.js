const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

mongoose.connect('mongodb://root:'+
 process.env.MONGO_ATLAS_PW +
 '@cluster-unqfy-shard-00-00-vd8ke.mongodb.net:27017,cluster-unqfy-shard-00-01-vd8ke.mongodb.net:27017,cluster-unqfy-shard-00-02-vd8ke.mongodb.net:27017/test?ssl=true&replicaSet=Cluster-UNQfy-shard-0&authSource=admin&retryWrites=true', 
 {
    //useMongoClient:true, 
    useNewUrlParser:true
 }
);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});


const artistRoutes = require('./api/routes/artist');
const albumRoutes = require('./api/routes/albums');

app.use('/api/artists', artistRoutes);
app.use('/api/albums', albumRoutes);

app.use((req, res, next) => {
    const error = new Error('not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) =>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
});

module.exports = app;