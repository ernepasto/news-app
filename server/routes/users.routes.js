//users.routes.js
const validation = require('../validation/user.validation');
const User = require('../models/user.model');
const auth = require('../auth');
const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();

/* Passport configuration */
const passport = require('passport');
require('../config/passport.config')(passport);
router.use(passport.initialize());
router.use(passport.session()); // Persistent login sessions 

/* Parse data from client */
router.use(express.json());

/* Route for user registration */
router.post('/signup', auth.verifyNoAutetication, async (req, res) => {
    const { error } = validation.register(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    const email = await User.findOne({ email: req.body.email });
    if (email) return res.status(400).send({ message: 'email already exists' });

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: password
    });

    try {
        await user.save();

        req.login(user, (error) => {
            if (error) return res.status(400).send({ message: 'system error' });
        });
        res.status(200).send({ message: 'user registered' });
    } catch (error) {
        res.status(400).send({ message: 'system error' });
    }
});

/* Route for user login */
router.post('/login', auth.verifyNoAutetication, passport.authenticate('local'), (req, res) => {
    res.status(200).send({ message: 'user logged in' });
});

/* Route to update users's data */
router.post('/update', auth.verifyAutetication, async (req, res) => {
    const { error } = validation.update(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ _id: req.session.passport.user });
    if (!user) return res.status(400).send({ message: 'system error' });

    if (req.body.email !== user.email) {
	const email = await User.findOne({ email: req.body.email });
        if (email) return res.status(400).send({ message: 'email already exists' });
    }

    const password = await bcrypt.compare(req.body.password, user.password);
    if(!password) return res.status(400).send({ message: 'invalid password' });

    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(req.body.newPassword, salt);

    const newUser = {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: newPassword
    };

    try {
        await User.findOneAndUpdate({ _id: req.session.passport.user }, newUser);
        res.status(200).send({ message: 'user updated', user: { name: newUser.name, surname: newUser.surname, email: newUser.email }});
    } catch (error) {
        res.status(400).send({ message: 'system error' });
    }
});

/* Route to search a user by id */
router.get('/getuser', auth.verifyAutetication, async (req, res) => {
    const user = await User.findOne({ _id: req.session.passport.user });
    if (!user) return res.status(400).send({ message: 'system error' });
    res.status(200).send({ message: { user: { name: user.name, surname: user.surname, email: user.email, date: user.date }} });
});

/* Route to delete a user account */
router.post('/delete', auth.verifyAutetication, async (req, res) => {
    const { error } = validation.remove(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ _id: req.session.passport.user });
    const password = await bcrypt.compare(req.body.password, user.password);
    if(!password) return res.status(400).send({ message: 'invalid password' });
    
    try {
        await User.findOneAndDelete({ _id: req.session.passport.user });
        req.logout();
        res.status(200).send({ message: 'user deleted' });
    } catch (error) {
        res.status(400).send({ message: 'system error' });
    }
});

/* Route for user logout */
router.get('/logout', (req, res) => {
    req.logout();
    res.status(200).send({ message: 'user logged out' });
});

/* Route to check if user is logged in */
router.get('/checkAuth', (req, res) => {
    res.status(200).send({ auth: req.isAuthenticated() });
});

module.exports = router;