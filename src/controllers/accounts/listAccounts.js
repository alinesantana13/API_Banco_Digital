const knex = require('../../connection');
const { banco } = require('../../bankDetails');

const listAccounts = async (require, response) => {
    const { senha_banco } = require.query;
    if (!senha_banco) {
        return response.status(404).json({ mensagem: "A senha do banco não foi informada" })
    }

    if (senha_banco !== banco.senha) {
        return response.status(401).json({ mensagem: "A senha do banco informada é inválida" });
    }

    const contas = await knex('contas').select('numeroconta', 'nome');

    return response.status(200).json(contas);
}

module.exports = listAccounts;