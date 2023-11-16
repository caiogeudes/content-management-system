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
    const { contentId } = req.params;
    if (!title) {
        title = null
    } else if (!content) {
        content = null
    }
    try {
        const updatedContent = await knex('content').update({ title, content }).where('id', contentId).returning('*');
        return res.status(200).json(updatedContent[0]);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
}

const editContent = async (req, res) => {
    const { title, content } = req.body;
    const { contentId } = req.params;
    if (title && content) {
        return res.status(400).json({ mensagem: 'Neste endpoint, só podemos editar um campo por vez. Escolha apenas "Title" ou "Content" para editá-lo.' });
    } else {
        try {
            if (title) {
                const editedContent = await knex('content').update({ title }).where('id', contentId).returning('*');
                return res.status(200).json(editedContent[0]);
            } else if (content) {
                const editedContent = await knex('content').update({ content }).where('id', contentId);
                return res.status(200).json(editedContent[0]).returning('*');
            }
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
        }
    }
}

const deleteContent = async (req, res) => {
    const { contentId } = req.params;
    try {
        await knex('content').delete().where('id', contentId);
        return res.status(200).json({ mensagem: 'Conteúdo excluído' });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
}

const contentFeed = async (req, res) => {
    let { page } = req.query;
    if (!page) {
        page = 1;
    }

    try {
        const feed = await knex('content').limit(10).offset((10 * page) - 10).returning('*');
        if (feed.length <= 0) {
            return res.status(404).json({ mensagem: 'Página não encontrada.' });
        } else {
            return res.status(200).json(feed);
        }

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
}

module.exports = {
    uploadContent,
    updateContent,
    editContent,
    deleteContent,
    contentFeed
}