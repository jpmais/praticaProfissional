var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const port = 8000

var lojaRouter = require('./routes/loja');
var cadastroRouter = require('./routes/cadastro');
var loginRouter = require('./routes/login');
var produtoRouter = require('./routes/produto');
var femininaRouter = require('./routes/feminina');
var masculinoRouter = require('./routes/masculino');
var calcadosRouter = require('./routes/calcados');
var acessoriosRouter = require('./routes/acessorios');


var app = express();

//static
app.use(express.static('public'))
app.use('/static', express.static('public'))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', lojaRouter);
app.use('/cadastro', cadastroRouter);
app.use('/login', loginRouter);
app.use('/produto', produtoRouter);
app.use('/feminina', femininaRouter);
app.use('/masculino', masculinoRouter);
app.use('/calcados', calcadosRouter);
app.use('/acessorios', acessoriosRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
app.listen(8000, () => {
  console.log('rodando')
});
