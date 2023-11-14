const express = require('express');
const { createUser } = require('./controllers/user');
const { login } = require('./controllers/login');
const { validateNewUser, validateLogin } = require('./middlewares/validations');
const rota = express();

rota.post('/user', validateNewUser, createUser);
rota.post('/login', validateLogin, login);

module.exports = rota;