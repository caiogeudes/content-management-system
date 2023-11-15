const bcrypt = require('bcrypt');
const knex = require('../connections/knexConnection');

const createUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const encryptedPassword = await bcrypt.hash(password, 10);

        const newUser = await knex('users').insert({
            name,
            email,
            password: encryptedPassword
        }).returning('*');

        const { password: _, ...newUserInfo } = newUser[0];
        return res.status(200).json(newUserInfo);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
}

const getUserInfo = async (req, res) => {
    const user = req.user;
    try {
        const contentsFound = await knex('content').where('user_id', user.id).returning('*');
        return res.status(200).json({
            user,
            contents: contentsFound
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
}

module.exports = {
    createUser,
    getUserInfo
}