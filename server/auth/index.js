//index.js
const verifyAutetication = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).send({ message: 'authentication required' });
    }
};

const verifyNoAutetication = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next();
    } else {
        res.status(406).send({ message: 'you are already logged in' });
    }
};

module.exports = { verifyAutetication, verifyNoAutetication };