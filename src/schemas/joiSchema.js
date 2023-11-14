const Joi = require('joi');

const newUserSchema = Joi.object({
    name: Joi.string().required().min(2).messages({
        'any.required': `O campo 'Name' precisa ser informado.`,
        'string.empty': `O campo 'Name' precisa conter letras.`,
        'string.min': `O campo 'Name' precisa ter no mínimo 2 caracteres.`
    }),
    email: Joi.string().email().required().messages({
        'any.required': `O campo 'Email' precisa ser informado.`,
        'string.empty': `O campo 'Email' precisa conter letras.`,
        'string.email': `O campo 'Email' precisa ser um e-mail válido.`
    }),
    password: Joi.string().min(4).max(20).required().messages({
        'any.required': `O campo 'Password' precisa ser informado.`,
        'string.empty': `O campo 'Password' precisa conter letras.`,
        'string.min': `O campo 'Password' precisa conter no minímo 4 caracteres.`,
        'string.max': `O campo 'Password' só pode ter até 20 caracteres.`
    })
});

const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'any.required': `O campo 'Email' precisa ser informado.`,
        'string.empty': `O campo 'Email' precisa conter letras.`,
        'string.email': `O campo 'Email' precisa ser um e-mail válido.`
    }),
    password: Joi.string().min(4).max(20).required().messages({
        'any.required': `O campo 'Password' precisa ser informado.`,
        'string.empty': `O campo 'Password' precisa conter letras.`,
        'string.min': `O campo 'Password' precisa conter no minímo 4 caracteres.`,
        'string.max': `O campo 'Password' só pode ter até 20 caracteres.`
    })
});

module.exports = {
    newUserSchema,
    loginSchema
}
