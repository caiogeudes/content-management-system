const jwt = require('jsonwebtoken');
const knex = require('../connections/knexConnection');

const verificateLoggedUser = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(400).json({ mensagem: 'O token deve ser fornecido.' })
    }
    const token = authorization.split(' ')[1];
    try {
        const { id } = await jwt.verify(token, process.env.JWT_KEY);
        const userFound = await knex('users').where('id', id);
        const { password: _, ...userInfo } = userFound[0];
        req.user = userInfo;
        next()
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
    }
};

const verifyContentId = async (req, res, next) => {
    const { contentId } = req.params;
    const { id } = req.user;

    try {
        const contentFound = await knex('content').where('id', contentId).returning('*');
        if (contentFound[0].user_id !== id) {
            return res.status(400).json({ mensagem: 'Conteúdo não pertence ao usuário logado.' })
        } else if (contentFound.length < 1) {
            return res.status(404).json({ mensagem: 'Conteúdo não encontrado.' })
        } else {
            next()
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
    }

}

module.exports = {
    verificateLoggedUser,
    verifyContentId
}