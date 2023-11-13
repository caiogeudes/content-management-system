const express = require('express');
const { createUser } = require('./controllers/user');
const { validateNewUser } = require('./middlewares/validations');
const rota = express();

rota.post('/user', validateNewUser, createUser);

module.exports = rota;