const knex = require('../connection');

const updateAccount = async (req, res) => {
    const { numeroconta } = req.user;
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    if (!nome && !cpf && !email && !senha && !data_nascimento && !telefone) {
        return res.status(400).json('É obrigatório informar ao menos um campo para atualização');
    }
    try {
        const body = {};

        if (nome) {
            body.nome = nome;
        }

        if (cpf) {
            if (cpf != req.user.cpf) {
                const verifyCpf = await knex('contas').where({ cpf });
                if (verifyCpf.length !== 0) {
                    return res.status(400).json({ mensagem: 'CPF já existe' })
                }
            }
            body.cpf = cpf;
        }

        if (data_nascimento) {
            body.data_nascimento = data_nascimento;
        }

        if (telefone) {
            body.telefone = telefone;
        }

        if (email) {
            if (email != req.user.email) {
                const verifyEmail = await knex('contas').where({ email });

                if (verifyEmail.length !== 0) {
                    return res.status(400).json({ mensagem: 'Email já existe' })
                }
            }
            body.email = email;
        }

        if (senha) {
            body.senha = senha;
        }

        const updateUser = await knex('contas').where({ numeroconta }).update(body);

        return res.status(204).send();
    } catch (error) {
        console.log(error)
        return res.status(500).json({ mensagem: 'Erro interno no servidor' });
    }

}

module.exports = updateAccount;