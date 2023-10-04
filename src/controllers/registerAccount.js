const knex = require('../connection');
const bcrypt = require('bcrypt');

const registerAccount = async (req, res) => {
    const { nome, cpf, email, data_nascimento, telefone, senha } = req.body;

    try {
        const userCpf = await knex('contas').where({ cpf });

        if (userCpf.length === 1) {
            return res.status(400).json({ mensagem: 'O cpf já cadastrado' });
        }
        const userEmail = await knex('contas')
            .where({ email });

        if (userEmail.length === 1) {
            return res.status(400).json({ mensagem: 'O email já cadastrado' });
        }

        const encryptedPassword = await bcrypt.hash(senha, 10);

        const user = await knex('contas').insert({ nome, cpf, email, data_nascimento, telefone, senha: encryptedPassword });

        return res.status(201).json({ mensagem: 'Conta cadastrada com sucesso' });

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno no servidor' });
    }
}

module.exports = registerAccount;