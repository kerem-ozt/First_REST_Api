//Include necessary modules and files
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./api/routes/users');

//MongoDB connection with password
mongoose.set("strictQuery", true);
mongoose.connect('mongodb+srv://rollic:rollic@rest-api-rollic.le2zc2k.mongodb.net/?retryWrites=true&w=majority');
//mongoose.connect('mongodb+srv://rollic:' + process.env.MONGO_ATLAS_PW + '@rest-api-rollic.le2zc2k.mongodb.net/?retryWrites=true&w=majority');
mongoose.Promise = global.Promise;

//Use morgan and body parser for handling cors and parsing body in functions
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Add headers we want to access for connection
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
               "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

//Route which should hanle requests
app.use('/users',userRoutes)

//Handling errors
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
