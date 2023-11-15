const { b2 } = require('../connections/b2Connection');
const knex = require('../connections/knexConnection');

const uploadFile = async (req, res) => {
    const { file } = req;
    const { contentId } = req.params;
    const { id } = req.user
    try {
        const authorization = await b2.authorize();
        const { downloadUrl } = authorization.data;
        const response = await b2.getUploadUrl({
            bucketId: process.env.B2_BUCKET_ID
        })
        const { authorizationToken, uploadUrl } = response.data;
        const fileUploaded = await b2.uploadFile({
            uploadUrl,
            uploadAuthToken: authorizationToken,
            fileName: file.originalname,
            data: file.buffer
        });
        const url = `${downloadUrl}/file/${process.env.B2_BUCKET_NAME}/${fileUploaded.data.fileName}`;
        const newFile = await knex('content_file').insert({
            content_id: contentId,
            user_id: id,
            file: url
        }).returning('*');
        return res.status(200).json(newFile);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
    }
}

module.exports = {
    uploadFile
}