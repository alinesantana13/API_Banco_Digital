const database = require('../../bankDetails');
const { accountNumber, validations, checkCpf, checkEmail, checkCPFlAndAccountNumber, checkEmailAndAccountNumber } = require('../../utils/utils-conta');
const { contas } = database;

let id = 0;

//Update bank account user data
const updateUserData = async (require, response) => {
    const { numeroConta } = require.params;
    const { nome, cpf, data_nascimento, telefone, email, senha } = require.body;

    if (!nome && !cpf && !email && !senha && !data_nascimento && !telefone) {
        return res.status(404).json('É obrigatório informar ao menos um campo para atualização');
    }
    try {
        const body = {};

        if (nome) {
            body.nome = nome;
        }

        if (email) {
            if (email != require.user.email) {
                const verifyEmail = await knex('contas').where({ email });

            }
        }

    } catch (error) {

    }

}

//delete a bank account
const deleteAccount = (require, response) => {
    const { numeroConta } = require.params;

    const searchNumeroConta = accountNumber(numeroConta, response);

    if (searchNumeroConta.usuario) {
        const position = contas.indexOf(searchNumeroConta);

        if (contas[position].saldo !== 0) {
            return response.status(404).json({ mensagem: "A conta só pode ser removida se o saldo for zero!" });
        }

        contas.splice(position, 1);
        return response.status(204).json();
    }
}

module.exports = {
    updateUserData,
    deleteAccount
};