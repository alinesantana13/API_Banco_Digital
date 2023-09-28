const knex = require('../connection');
const jwt = require('jsonwebtoken');
const passwordHash = require('../passwordHash')

const verifyLogin = async (require, response, next) => {
    const { authorization } = require.headers;

    const token = authorization.split(' ')[1];

    try {
        if (authorization === 'Bearer') {
            throw { statusCode: 401, message: "Usuário não autenticado" }
        }

        const { id } = jwt.verify(token, passwordHash);

        const user = await knex('contas').where({ numeroconta: id });

        if (user[0].length === 0) {
            throw { statusCode: 401, message: "Usuário não autenticado" };
        }

        const { senha: _, ...formatUser } = user[0];

        require.user = formatUser;

        next();
    } catch (error) {
        return response.status(error.statuCode || 500).json({ mensagem: 'Não autorizado' })
    }
}

module.exports = verifyLogin;