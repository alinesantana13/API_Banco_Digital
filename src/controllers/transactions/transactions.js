const format = require('date-fns/format');
const { contas, saques, depositos, transferencias } = require('../../bankDetails');
const { checkerBalanceAndExtract, checkerDepositAndWithdraw, toCheckNumberAccount } = require('../../utils/utils-transactions');

//Deposit to a bank account
const deposit = (require, response) => {
    const { numero_conta, valor } = require.body;

    const searchNumeroConta = checkerDepositAndWithdraw(numero_conta, valor, response);
    if (searchNumeroConta.usuario) {
        depositos.push({
            data: format(new Date(), "yyyy/MM/dd HH:mm:ss"),
            numero_conta,
            valor
        })
        const position = contas.indexOf(searchNumeroConta);
        contas[position].saldo += valor;
        return response.status(204).json();
    }
}

//Withdraw from a bank account
const withdraw = (require, response) => {
    const { numero_conta, valor, senha } = require.body;

    const searchNumeroConta = checkerDepositAndWithdraw(numero_conta, valor, response);
    if (searchNumeroConta.usuario) {
        if (!senha) {
            return response.status(404).json({ mensagem: "A senha é obrigatória." });
        }
        if (senha !== searchNumeroConta.usuario.senha) {
            return response.status(404).json({ mensagem: "Senha incorreta!" })
        }
        let position = contas.indexOf(searchNumeroConta);
        if (valor > contas[position].saldo) {
            return response.status(404).json({ mensagem: "Saldo insuficiente" })
        }
        contas[position].saldo -= valor;

        saques.push({
            data: format(new Date(), "yyyy/MM/dd HH:mm:ss"),
            numero_conta,
            valor
        })

        return response.status(204).json();
    }
}

//Transfer amounts between bank accounts
const transfer = (require, response) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = require.body;

    if (!numero_conta_origem) {
        return response.status(404).json({ mensagem: "O número da conta de origem é obrigatório" });
    }
    if (!numero_conta_destino) {
        return response.status(404).json({ mensagem: "O número da conta de destino é obrigatório" });
    }
    if (!valor && valor !== 0) {
        return response.status(404).json({ mensagem: "O valor é obrigatório." });
    }
    if (!senha) {
        return response.status(404).json({ mensagem: "A senha é obrigatória." });
    }
    //check if source account exists
    const searchOrigem = contas.find((item) => {
        return item.numero === Number(numero_conta_origem);
    })
    if (!searchOrigem) {
        return response.status(404).json({ mensagem: "O número da conta de origem não existe." });
    }
    //check if target account exists
    const searchDestino = contas.find((item) => {
        return item.numero === Number(numero_conta_destino);
    })
    if (!searchDestino) {
        return response.status(404).json({ mensagem: "O número da conta de destino não existe." });
    }

    if (valor <= 0) {
        return response.status(404).json({ mensagem: "Não é permitido transferências com valores negativos ou zerados" })
    }
    //Verificar se a senha informada é uma senha válida para a conta de origem informada
    if (senha !== searchOrigem.usuario.senha) {
        return response.status(404).json({ mensagem: "Senha incorreta!" })
    }
    //Verificar se há saldo disponível na conta de origem para a transferência
    let positionOrigin = contas.indexOf(searchOrigem);
    let positionDestiny = contas.indexOf(searchDestino);
    if (valor > contas[positionOrigin].saldo) {
        return response.status(404).json({ mensagem: "Saldo insuficiente" })
    }
    contas[positionOrigin].saldo -= valor;
    contas[positionDestiny].saldo += valor;

    transferencias.push({
        data: format(new Date(), "yyyy/MM/dd HH:mm:ss"),
        numero_conta_origem,
        numero_conta_destino,
        valor
    })

    return response.status(204).json();
}

//Check bank account balance
const balance = (require, response) => {
    const { numero_conta, senha } = require.query;

    const searchNumeroConta = checkerBalanceAndExtract(numero_conta, senha, response);
    if (searchNumeroConta.usuario) {
        return response.status(200).json({ saldo: searchNumeroConta.saldo });
    }
}

//issue bank statement
const extract = (require, response) => {
    const { numero_conta, senha } = require.query;

    const searchNumeroConta = checkerBalanceAndExtract(numero_conta, senha, response);
    if (searchNumeroConta.usuario) {

        const deposits = depositos.filter((item) => {
            return item.numero_conta === numero_conta;
        })
        const withdrawals = saques.filter((item) => {
            return item.numero_conta === numero_conta;
        })

        const sentTransfers = transferencias.filter((item) => {
            return item.numero_conta_origem === numero_conta;
        })
        const incomingTransfers = transferencias.filter((item) => {
            return item.numero_conta_destino === numero_conta;
        })
        const extract = {
            depositos: deposits,
            saques: withdrawals,
            transferenciasEnviadas: sentTransfers,
            transferenciasRecebidas: incomingTransfers
        }
        return response.status(200).json(extract);
    }
}

module.exports = {
    deposit,
    withdraw,
    transfer,
    balance,
    extract
}