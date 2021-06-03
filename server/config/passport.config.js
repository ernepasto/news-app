//passport.config.js
const Strategy = require('passport-local');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

const strategyOptions = { usernameField: 'email', passwordField: 'password' };

module.exports = (passport) => {
    passport.use(new Strategy(strategyOptions, (email, password, done) => {
        /* Searching user with email */
        User.findOne({ email: email }, (error, user) => {
            
            if (error) return done(error);
            if (!user) return done(null, false);
            
            /* If user exists, password check */
            bcrypt.compare(password, user.password, (error, result) => {
                
                if (error) return done(error);
                if (result == true) return done(null, user);
                return done(null, false);

            });
        });
    }));

    /* Methods to manage session data */
    passport.serializeUser((user, cb) => {
        cb(null, user.id);
    });
    passport.deserializeUser((id, cb) => {
        User.findOne({ _id: id }, (error, user) => {
            cb(error, user);
        });
    });

};