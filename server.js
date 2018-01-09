// global
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const Cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config()

// app
const app = express()

// mongoose config
// if server run in local set database in local
// if server run in host server set datavbase in server
mongoose.Promise = require('bluebird');
mongoose.connect( app.get('env') == 'development' ? process.env.localDatabaseUrl : process.env.serverDatabaseUrl )
    .then(()=>console.log('connected to the database'))
    .catch(err=>console.log(err));


// http
const http = require('http').Server(app);
http.listen( process.env.PORT || 3000 , ()=>console.log('server is run [3000]'))

// socket.io
const io = require('socket.io')(http);
require('./realTime/io')(io)


// middlewares
app.use(Cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// angular files
app.use(express.static(path.join(__dirname, 'client/dist')));


// routers
const api = require('./routes/api');
app.use('/api', api);

// index.html
app.get('*' , function(req,res){
    res.sendfile(path.join(__dirname, 'client/dist/index.html'))
})


module.exports = app;
