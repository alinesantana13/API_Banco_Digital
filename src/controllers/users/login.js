const knex = require('../../connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passwordHash = require('../../passwordHash')

const login = async (require, response) => {
    const { email, cpf, senha } = require.body;

    if ((!email) && (!cpf)) {
        return response.status(403).json('É obrigatório informar o email ou CPF');
    }

    if (!senha) {
        return response.status(403).json('É obrigatório informar a senha')
    }

    try {
        const user = await knex('contas')
            .where('email', `${email ? email : ''}`)
            .orWhere('cpf', `${cpf ? cpf : ''}`);

        if (user.length === 0) {
            return response.status(400).json(`${email ? 'Email' : 'CPF'} ou senha inválido`)
        }

        const validationPassword = await bcrypt.compare(senha, user[0].senha);

        if (!validationPassword) {
            return response.status(400).json(`${email ? 'Email' : 'CPF'} ou senha inválido`)
        }

        const token = jwt.sign({ id: user[0].numeroconta }, passwordHash, { expiresIn: '8h' });

        const { senha: _, numeroconta, nome } = user[0];

        return response.json({
            numeroconta,
            nome,
            token
        })
    } catch (error) {
        return response.status(500).json(error.message);
    }
}

module.exports = login;