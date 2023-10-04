const joi = require('joi');

const userSchema = joi.object({
    nome: joi.string().required().messages({
        'any.required': 'O nome é obrigatório',
        'string.empty': 'O nome é obrigatório'
    }),
    cpf: joi.required().messages({
        'any.required': 'O cpf é obrigatório',
    }),
    email: joi.string().email().required().messages({
        'any.required': 'O email é obrigatório',
        'string.empty': 'O email é obrigatório',
        'string.email': 'O email precisa ter um email valido'
    }),
    data_nascimento: joi.required().messages({
        'any.required': 'A data_nascimento é obrigatória'
    }),
    telefone: joi.string().required().messages({
        'any.required': 'O telefone é obrigatório',
        'string.empty': 'O  telefone é obrigatório'
    }),
    senha: joi.string().required().messages({
        'any.required': 'A senha é obrigatória',
        'string.empty': 'A senha é obrigatória'
    })

});

module.exports = userSchema;