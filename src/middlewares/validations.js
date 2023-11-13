const { newUserSchema } = require("../schemas/joiSchema")

const validateNewUser = async (req, res, next) => {
    const { name, email, password } = req.body
    try {
        await newUserSchema.validateAsync({ name, email, password });
        next()
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ mensagem: error.message });
    }
}

module.exports = {
    validateNewUser
}