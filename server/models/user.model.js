//users.model.js
const mongoose = require('mongoose');

const user = {
    name: {
        type: String,
        max: 255,
        min: 2,
        required: true
    },
    surname: {
        type: String,
        max: 255,
        min: 2,
        required: true
    },
    email: {
        type: String,
        max: 255,
        min: 6,
        unique: true,
        required: true
    }, 
    password: {
        type: String,
        max: 1024,
        min: 8,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    }
};

const userSchema = new mongoose.Schema(user);

module.exports = mongoose.model('User', userSchema);