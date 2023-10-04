const knex = require('../connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passwordHash = require('../passwordHash')

const login = async (req, res) => {
    const { email, cpf, senha } = req.body;

    try {
        const user = await knex('contas')
            .where('email', `${email ? email : ''}`)
            .orWhere('cpf', `${cpf ? cpf : ''}`);

        if (user.length === 0) {
            return res.status(400).json(`${email ? 'Email' : 'CPF'} ou senha inválido`)
        }

        const validationPassword = await bcrypt.compare(senha, user[0].senha);

        if (!validationPassword) {
            return res.status(400).json(`${email ? 'Email' : 'CPF'} ou senha inválido`)
        }

        const token = jwt.sign({ id: user[0].numeroconta }, passwordHash, { expiresIn: '8h' });

        const { senha: _, numeroconta, nome } = user[0];

        return res.json({
            numeroconta,
            nome,
            token
        })
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno no servidor' });
    }
}

module.exports = login;