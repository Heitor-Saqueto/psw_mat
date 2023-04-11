// Carrega as variáveis de ambiente do arquivo
// .env para a aplicação
require('dotenv').config()

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

// Conexão ao BD ------------------------------------------
const db = require('./models')

try {
  db.sequelize.authenticate()
  console.log('SEQUELIZE: connection has been established successfully.')
}
catch(error) {
  console.error('* SEQUELIZE: unable to connect to the database: ', error)
  process.exit(1)     // Encerra o servidor com erro
}
// ---------------------------------------------------------

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Chama a verificação de autenticação para qualquer rota
const auth = require('./lib/auth')
app.use(auth)

/********************* ROTAS ***************************/
const users = require('./routes/users')
app.use('/users', users)

const channels = require('./routes/channels')
app.use('/channels', channels)

const cities = require('./routes/cities')
app.use('/cities', cities)

const customerTags = require('./routes/customer_tags')
app.use('/customer_tags', customerTags)

const customers = require('./routes/customers')
app.use('/customers', customers)

const paymentMethods = require('./routes/payment_methods')
app.use('/payment_methods', paymentMethods)

const tags = require('./routes/tags')
app.use('/tags', tags)

module.exports = app;
