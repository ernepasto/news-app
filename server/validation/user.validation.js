//user.validation.js
const joi = require('@hapi/joi');

const register = (data) => {
    const schema = {
        name: joi
            .string()
            .max(255)
            .min(2)
            .required(),
        surname: joi
            .string()
            .max(255)
            .min(2)
            .required(),
        email: joi
            .string()
            .email()
            .max(255)
            .min(6)
            .required(),
        password: joi
            .string()
            .max(1024)
            .min(8)
            .required(),
        date: joi
            .date()
    };
    return joi.validate(data, schema);
};

const login = (data) => {
    const schema = {
        email: joi
            .email()
            .max(255)
            //.pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
            .required(),
        password: joi
            .string()
            .max(1024)
            .required()
    };
    return joi.validate(data, schema);
};

const update = (data) => {
    const schema = {
        name: joi
            .string()
            .max(255)
            .min(2)
	    .required(),	
        surname: joi
            .string()
            .max(255)
            .min(2)
	    .required(),
        email: joi
            .string()
            .email()
            .max(255)
            .min(6)
            .required(),
	password: joi
            .string()
            .required(),
        newPassword: joi
            .string()
            .required()
    };
    return joi.validate(data, schema);
};

const remove = (data) => {
    const schema = {
	password: joi
            .string()
            .required()
    };
    return joi.validate(data, schema);
};

module.exports = { register, login, update, remove };