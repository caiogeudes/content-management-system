const express = require('express');
const multer = require('./utils/multer');
const { createUser, getUserInfo } = require('./controllers/user');
const { login } = require('./controllers/login');
const { validateNewUser, validateLogin, validateContent } = require('./middlewares/validations');
const { verificateLoggedUser, verifyContentId } = require('./middlewares/verifications');
const { uploadContent, updateContent, editContent, deleteContent, contentFeed } = require('./controllers/content');
const { uploadFile } = require('./controllers/contentFile');
const rota = express();

rota.post('/user', validateNewUser, createUser);
rota.post('/login', validateLogin, login);
rota.use(verificateLoggedUser);
rota.post('/content', validateContent, uploadContent);
rota.post('/contentFile/:contentId', verifyContentId, multer.single('file'), uploadFile);
rota.put('/content/:contentId', verifyContentId, validateContent, updateContent);
rota.patch('/content/:contentId', verifyContentId, validateContent, editContent);
rota.delete('/content/:contentId', verifyContentId, deleteContent);
rota.get('/user', getUserInfo);
rota.get('/feed', contentFeed);

module.exports = rota;