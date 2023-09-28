const { contas } = require('../bankDetails');


const accountNumber = (numeroConta, response) => {
    const searchNumeroConta = contas.find((item) => {
        return item.numero === Number(numeroConta);
    })
    if (!searchNumeroConta) {
        return response.status(404).json({ mensagem: "Conta bancária não encontada!" });
    }
    return searchNumeroConta;
}

const validations = (nome, cpf, data_nascimento, telefone, email, senha, response) => {
    //mandatory and validations
    if (!nome) {
        return response.status(404).json({ mensagem: "O nome é obrigatório." })
    }
    if (!cpf) {
        return response.status(404).json({ mensagem: "O cpf é obrigatório." })
    }
    if (!data_nascimento) {
        return response.status(404).json({ mensagem: "A data de nascimento é obrigatória." })
    }
    if (!telefone) {
        return response.status(404).json({ mensagem: "O telefone é obrigatório" })
    }
    if (!email) {
        return response.status(404).json({ mensagem: "O email é obrigatório" })
    }
    if (!senha) {
        return response.status(404).json({ mensagem: "A senha é obrigatória." })
    }
}

const checkCpf = (cpf) => {
    //check if the cpf already exists
    const searchCPF = contas.find((item) => {
        return item.usuario.cpf === cpf;
    })
    if (searchCPF) {
        return true;
    }
    return false;
}

const checkEmail = (email) => {
    //check if the email already exists
    const searchEmail = contas.find((item) => {
        return item.usuario.email === email;
    })
    if (searchEmail) {
        return true;
    }
    return false;
}

const checkCPFlAndAccountNumber = (cpf, numeroConta) => {
    //check if the cpf already exists
    const searchCPF = contas.find((item) => {
        return item.usuario.cpf === cpf;
    })
    if (searchCPF) {
        if (searchCPF.numero !== Number(numeroConta)) {
            return true;
        }
    }
    return false;
}

const checkEmailAndAccountNumber = (email, numeroConta) => {
    //check if the cpf already exists
    const searchEmail = contas.find((item) => {
        return item.usuario.email === email;
    })
    if (searchEmail) {
        if (searchEmail.numero !== Number(numeroConta)) {
            return true;
        }
    }
    return false;
}

module.exports = {
    accountNumber,
    validations,
    checkCpf,
    checkEmail,
    checkCPFlAndAccountNumber,
    checkEmailAndAccountNumber
};