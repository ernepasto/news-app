//index.js
const dotenv = require('dotenv').config();
const express = require('express');
const server = express();

/* Cross-origin resource sharing */
const cors = require('cors');
server.use(cors({ credentials: true, origin: ['http://localhost:8080'], methods: ['GET', 'PUT', 'POST'], allowedHeaders: ['Content-Type', 'Authorization'] }));

/* Express session configuration */
const session = require('express-session');
server.use(session({
    secret: process.env.SESSION_SECRET, 
    resave: false, 
    saveUninitialized: false, 
    cookie: {
        secure: false, // HTTPS connection
        httpOnly: true,
        maxAge: 1000 * 60 * 60 // 1 hour
    }
}));

/* Setting up access log file */
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const accessLogStream =  fs.createWriteStream(path.join(__dirname, 'log/access.log'), { flags: 'a' })
server.use(morgan('combined',{stream: accessLogStream}))

/* Database connection */
const mongoose = require('mongoose');
const mongooseOption = { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false };
mongoose.connect(process.env.DATABASE_ADDRESS, mongooseOption);

/* Set header for all responses */
server.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
});

/* Setting up running port */
server.set('port', process.env.RUNNING_PORT);

/* Enable posts route */
const newsRoute = require('./routes/news.routes');
server.use('/api/news/', newsRoute);

/* Enable users route */
const usersRoute = require('./routes/users.routes');
server.use('/api/users/', usersRoute);

/* Starts server on configured port */
server.listen(server.get('port'), () => {
    console.log('Server ready on: http://127.0.0.1:' + server.get('port'));
});