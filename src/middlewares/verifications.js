const jwt = require('jsonwebtoken');
const knex = require('../connections/knexConnection');

const verificateLoggedUser = async (req, res, next) => {
    const { authorization } = req.headers;
    const token = authorization.split(' ')[1];
    try {
        const { id } = await jwt.verify(token, process.env.JWT_KEY);
        const userFound = await knex('users').where('id', id);
        const { password: _, ...userInfo } = userFound[0];
        req.user = userInfo;
        next()
    } catch (error) {
        console.log(error.message);
        return res.status({ mensagem: 'Erro interno do servidor.' })
    }
};

module.exports = {
    verificateLoggedUser
}