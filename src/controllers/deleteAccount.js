const knex = require('../connection');

const deleteAccount = async (req, res) => {
    const { numeroconta } = req.user;

    try {
        const deleteUser = await knex('contas').where({ numeroconta }).del();

        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno no servidor' });
    }
}

module.exports = deleteAccount;