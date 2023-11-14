const knex = require('../connections/knexConnection');

const uploadContent = async (req, res) => {
    const { title, content } = req.body;
    const { id } = req.user;
    try {
        const newContent = await knex('content').insert({ user_id: id, title, content }).returning('*');
        return res.status(201).json(newContent);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
}

const updateContent = async (req, res) => {
    let { title, content } = req.body;
    const { id } = req.params;
    if (!title) {
        title = null
    } else if (!content) {
        content = null
    }
    try {
        const updatedContent = await knex('content').update({ title, content }).where('id', id).returning('*');
        return res.status(200).json(updatedContent[0]);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
}

module.exports = {
    uploadContent,
    updateContent
}