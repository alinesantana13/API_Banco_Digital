const { contas } = require('../bankDetails');

const checkerDepositAndWithdraw = (numero_conta, valor, response) => {
    const searchNumeroConta = contas.find((item) => {
        return item.numero === Number(numero_conta);
    })
    if (!numero_conta) {
        return response.status(404).json({ mensagem: "O número da conta é obrigatório." });
    }
    if (!valor && valor !== 0) {
        return response.status(404).json({ mensagem: "O valor é obrigatório." });
    }
    if (!searchNumeroConta) {
        return response.status(404).json({ mensagem: "O número da conta não existe." });
    }
    if (valor <= 0) {
        return response.status(404).json({ mensagem: "O valor não pode ser menor ou igual a zero!" })
    }
    return searchNumeroConta;
}

const checkerBalanceAndExtract = (numero_conta, senha, response) => {
    if (!numero_conta) {
        return response.status(404).json({ mensagem: "O número da conta é obrigatório." });
    }
    if (!senha) {
        return response.status(404).json({ mensagem: "A senha é obrigatória." });
    }
    const searchNumeroConta = contas.find((item) => {
        return item.numero === Number(numero_conta);
    })
    if (!searchNumeroConta) {
        return response.status(404).json({ mensagem: "Conta bancária não encontada!" });
    }
    if (senha !== searchNumeroConta.usuario.senha) {
        return response.status(404).json({ mensagem: "Senha incorreta!" })
    }
    return searchNumeroConta;
}

module.exports = {
    checkerDepositAndWithdraw,
    checkerBalanceAndExtract
}