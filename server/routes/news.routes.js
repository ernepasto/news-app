//news.routes.js
const fetch = require('node-fetch');
const auth = require('../auth');
const express = require('express');
const router = express.Router();

/* Passport configuration */
const passport = require('passport');
require('../config/passport.config')(passport);
router.use(passport.initialize());
router.use(passport.session()); // Persistent login sessions 

/* Parse data from client */
router.use(express.json());

/* Route to get all news (top headlines) */
router.get('/', auth.verifyAutetication, async (req, res) => {
    const dataset = `https://newsapi.org/v2/top-headlines?country=it&apiKey=${process.env.API_ACCESS_KEY}`;
    fetch(dataset, { method: 'GET' })
        .then(data => data.json())
        .then(response => {
            if (response.status === 'ok') {
                const news = response.articles;
                return res.status(200).send(news);
            } else res.status(400).send({ message: 'API error' })
        })
        .catch(error => { res.status(400).send({ message: error }) });
});

/* Route to get news by category */
router.get('/:category', auth.verifyAutetication, async (req, res) => {
    const dataset = `https://newsapi.org/v2/top-headlines?country=it&category=${req.params.category}&apiKey=${process.env.API_ACCESS_KEY}`;
    fetch(dataset, { method: 'GET' })
        .then(data => data.json())
        .then(response => {
            if (response.status === 'ok') {
                const news = response.articles;
                return res.status(200).send(news);
            } else res.status(400).send({ message: 'API error' })
        })
        .catch(error => { res.status(400).send({ message: error }) });
});

module.exports = router;