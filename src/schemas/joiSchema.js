const Joi = require('joi');

const newUserSchema = Joi.object({
    name: Joi.string().required().min(2).messages({
        'any.required': `O campo 'Nome' precisa ser informado.`,
        'string.empty': `O campo 'Nome' precisa conter letras.`,
        'string.min': `O campo 'Nome' precisa ter no mínimo 2 caracteres.`
    }),
    email: Joi.string().email().required().messages({
        'any.required': `O campo 'Email' precisa ser informado.`,
        'string.empty': `O campo 'Email' precisa conter letras.`,
        'string.email': `O campo 'Email' precisa ser um e-mail válido.`
    }),
    password: Joi.string().min(4).max(20).required().messages({
        'any.required': `O campo 'Senha' precisa ser informado.`,
        'string.empty': `O campo 'Senha' precisa conter letras.`,
        'string.min': `O campo 'Senha' precisa conter no minímo 4 caracteres.`,
        'string.max': `O campo 'Senha' só pode ter até 20 caracteres.`
    })
});

module.exports = {
    newUserSchema
}
