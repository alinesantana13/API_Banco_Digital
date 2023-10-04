const knex = require('../connection');

const listAccounts = async (req, res) => {
    const { senha_banco } = req.query;
    if (!senha_banco) {
        return res.status(404).json({ mensagem: "A senha do banco não foi informada" })
    }

    if (senha_banco !== process.env.PASS_BANK) {
        return res.status(401).json({ mensagem: "A senha do banco informada é inválida" });
    }

    const contas = await knex('contas').select('numeroconta', 'nome');

    return res.status(200).json(contas);
}

module.exports = listAccounts;