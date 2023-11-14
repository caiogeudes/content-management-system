const express = require('express');
const { createUser } = require('./controllers/user');
const { login } = require('./controllers/login');
const { validateNewUser, validateLogin, validateContent } = require('./middlewares/validations');
const { verificateLoggedUser, verifyContentId } = require('./middlewares/verifications');
const { uploadContent, updateContent, editContent, deleteContent } = require('./controllers/content');
const rota = express();

rota.post('/user', validateNewUser, createUser);
rota.post('/login', validateLogin, login);
rota.use(verificateLoggedUser);
rota.post('/content', validateContent, uploadContent);
rota.put('/content/:contentId', verifyContentId, validateContent, updateContent);
rota.patch('/content/:contentId', verifyContentId, validateContent, editContent);
rota.delete('/content/:contentId', verifyContentId, deleteContent);

module.exports = rota;