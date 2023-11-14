const knex = require('../connections/knexConnection');

const uploadContent = async (req, res) => {
    const { title, content } = req.body;
    const { id } = req.user;
    if (!title && !content) {
        return res.status(400).json({ mensamge: 'É necessário enviar pelo ao menos o campo "Title" ou "Content"' })
    }
    try {
        const newContent = await knex('content').insert({ user_id: id, title, content }).returning('*');
        return res.status(201).json(newContent);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
    }
}

module.exports = {
    uploadContent
}