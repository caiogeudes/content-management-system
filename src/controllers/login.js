const knex = require('../connections/knexConnection');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const { email } = req.body
    try {
        const userFound = await knex('users').where('email', email);

        const token = await jwt.sign({ id: userFound[0].id }, process.env.JWT_KEY, { expiresIn: '1d' });
        const { password: _, ...userInfo } = userFound[0];
        return res.status(200).json({
            user: userInfo,
            token
        });
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
    }
}

module.exports = {
    login
};