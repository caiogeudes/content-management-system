const express = require('express');
const { createUser } = require('./controllers/user');
const { login } = require('./controllers/login');
const { validateNewUser, validateLogin, validateContent } = require('./middlewares/validations');
const { verificateLoggedUser } = require('./middlewares/verifications');
const { uploadContent, updateContent } = require('./controllers/content');
const rota = express();

rota.post('/user', validateNewUser, createUser);
rota.post('/login', validateLogin, login);
rota.use(verificateLoggedUser);
rota.post('/content', validateContent, uploadContent);
rota.put('/content/:id', validateContent, updateContent);

module.exports = rota;