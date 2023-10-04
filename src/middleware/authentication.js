const knex = require('../connection');
const jwt = require('jsonwebtoken');
const passwordHash = require('../passwordHash')

const verifyLogin = async (req, res, next) => {
    const { authorization } = req.headers;

    const token = authorization.split(' ')[1];

    try {
        if (authorization === 'Bearer') {
            throw { statusCode: 401, message: "Usuário não autenticado" }
        }

        const { id } = jwt.verify(token, passwordHash);

        const user = await knex('contas').where({ numeroconta: id }).first();

        if (user === undefined) {
            throw { statusCode: 401, message: "Usuário não autenticado" };
        }

        const { senha: _, ...formatUser } = user;

        req.user = formatUser;

        next();
    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}

module.exports = verifyLogin;