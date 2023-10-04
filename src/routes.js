const express = require('express');
const registerAccount = require('./controllers/registerAccount');
const login = require('./controllers/login');
const listAccounts = require('./controllers/listAccounts');
const verifyLogin = require('./middleware/authentication');
const validateRequest = require('./middleware/validateRequest');
const userSchema = require('./validations/users');
const loginSchema = require('./validations/verificationLogin');
const updateAccount = require('./controllers/updateAccount');
const deleteAccount = require('./controllers/deleteAccount');
const { deposit, withdraw, transfer, balance, extract } = require('./controllers/transactions');


const routes = express();

routes.post('/cadastro', validateRequest(userSchema), registerAccount);
routes.post('/login', validateRequest(loginSchema), login);

routes.get('/contas', listAccounts);

routes.use(verifyLogin);

routes.put('/contas/usuario', updateAccount);
routes.delete('/contas', deleteAccount);

//atualizar endpoints
routes.post('/transacoes/depositar', deposit);
routes.post('/transacoes/sacar', withdraw);
routes.post('/transacoes/transferir', transfer)
routes.get('/contas/saldo', balance)
routes.get('/contas/extrato', extract)

module.exports = routes;