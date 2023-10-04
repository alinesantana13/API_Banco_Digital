const joi = require('joi');

const loginSchema = joi.object({
    email: joi.string().email().required().messages({
        'any.required': 'O email é obrigatório',
        'string.empty': 'O email é obrigatório',
        'string.email': 'O email precisa ser válido'
    }),
    senha: joi.string().required().messages({
        'any.required': 'A senha é obrigatória',
        'string.empty': 'A senha é obrigatória'
    })

});

module.exports = loginSchema;