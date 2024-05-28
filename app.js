var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var produtosRouter = require('./routes/produtos');
var clientesRouter = require('./routes/clientes');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');

var app = express();

var dotenv = require('dotenv');
dotenv.config();
console.log(process.env.MYSQL_BD);

/*
// Importar o pacote node-cache
const NodeCache = require('node-cache');

// Criar uma nova instância de cache
const cache = new NodeCache();

// Adicionar um item ao cache com uma chave e um valor
cache.set('chave', 'valor');

// Obter o valor do cache com a chave
const valor = cache.get('chave');
console.log('Valor do cache:', valor);

// 60 segundos de tempo de vida
cache.set('chave2', 'valor2', 60); 

if (cache.has('chave2')) {
    console.log('Chave2 está no cache:',
cache.get('chave2')); // Deve imprimir 'valor2'
} else {
    console.log('Chave2 não está no cache');
}
 
cache.del('chave');

cache.flushAll();
*/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var cacheMiddleware = require('./middlewares/cacheMiddleware');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/clientes', cacheMiddleware, clientesRouter); 
app.use('/produtos', cacheMiddleware, produtosRouter); 

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  console.error(err);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
