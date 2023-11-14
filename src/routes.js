const express = require('express');
const { createUser } = require('./controllers/user');
const { login } = require('./controllers/login');
const { validateNewUser, validateLogin } = require('./middlewares/validations');
const { verificateLoggedUser } = require('./middlewares/verifications');
const rota = express();

rota.post('/user', validateNewUser, createUser);
rota.post('/login', validateLogin, login);
rota.use(verificateLoggedUser);
rota.get('/', (req, res) => {
    return res.json(req.user)
})
module.exports = rota;