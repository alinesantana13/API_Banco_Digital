const knex = require('../../connection');
const bcrypt = require('bcrypt');

const registerAccount = async (require, response) => {
    const { nome, cpf, email, data_nascimento, telefone, senha } = require.body;

    if (!nome) {
        return response.status(403).json('O nome é obrigatório.')
    }
    if (!cpf) {
        return response.status(403).json('O cpf é obrigatório.')
    }
    if (!email) {
        return response.status(403).json('O email é obrigatório.')
    }
    if (!data_nascimento) {
        return response.status(403).json('A data_nascimento é obrigatório.')
    }
    if (!telefone) {
        return response.status(403).json('O telefone é obrigatório.')
    }
    if (!senha) {
        return response.status(403).json('A senha é obrigatório.')
    }

    try {
        const userCpf = await knex('contas')
            .where({ cpf });

        if (userCpf.length === 1) {
            return response.status(400).json('O cpf já cadastrado');
        }
        const userEmail = await knex('contas')
            .where({ email });

        if (userEmail.length === 1) {
            return response.status(400).json('O email já cadastrado');
        }

        const encryptedPassword = await bcrypt.hash(senha, 10);

        const user = await knex('contas').insert({ nome, cpf, email, data_nascimento, telefone, senha: encryptedPassword });

        if (user.rowCount === 0) {
            return response.status(400).json('A conta não foi cadastrada');
        }

        return response.status(201).json('Conta cadastrada com sucesso');

    } catch (error) {
        return response.status(500).json(error.message);
    }
}

module.exports = registerAccount;