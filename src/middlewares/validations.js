const { newUserSchema, loginSchema } = require("../schemas/joiSchema");
const bcrypt = require('bcrypt');
const knex = require('../connections/knexConnection');

const validateNewUser = async (req, res, next) => {
    const { name, email, password } = req.body
    try {
        const searchEmail = await knex('users').where('email', email);
        if (searchEmail.length > 0) {
            return res.status(400).json({ mensagem: 'Email já cadastrado.' });
        }
        await newUserSchema.validateAsync({ name, email, password });
        next()
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ mensagem: error.message });
    }
}

const validateLogin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        await loginSchema.validateAsync({ email, password })
        const userFound = await knex('users').where('email', email);
        const comparePassword = await bcrypt.compare(password, userFound[0].password);
        if (userFound.length < 1 || !comparePassword) {
            return res.status(400).json({ mensagem: 'Email ou senha incorretos.' });
        } else {
            next()
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ mensagem: error.message })
    }
}

module.exports = {
    validateNewUser,
    validateLogin
}