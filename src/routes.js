const express = require('express');
const { updateUserData, deleteAccount } = require('./controllers/accounts/accounts');
const { deposit, withdraw, transfer, balance, extract } = require('./controllers/transactions/transactions');
const login = require('./controllers/users/login');
const verifyLogin = require('./middleware/authentication');
const listAccounts = require('./controllers/accounts/listAccounts');
const registerAccount = require('./controllers/users/registerAccount');

const routes = express();

routes.post('/cadastro', registerAccount);
routes.post('/login', login);

routes.get('/contas', listAccounts);

routes.use(verifyLogin);

routes.put('/contas/:numeroConta/usuario', updateUserData);
routes.delete('/contas/:numeroConta', deleteAccount);

routes.post('/transacoes/depositar', deposit);
routes.post('/transacoes/sacar', withdraw);
routes.post('/transacoes/transferir', transfer)
routes.get('/contas/saldo', balance)
routes.get('/contas/extrato', extract)

module.exports = routes;