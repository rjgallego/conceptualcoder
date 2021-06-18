require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// var cors = require('cors');
var mongoose = require('mongoose');
var session = require('express-session');
var bodyParser = require('body-parser');
var passport = require('./config/passport');

var indexRouter = require('./routes/index');
var newRouter = require('./routes/new');
var articleRouter = require('./routes/article');
var deleteRouter = require('./routes/delete');
var userRouter = require('./routes/api/users');
var editRouter = require('./routes/edit');

var app = express();
// let corsOptions = {};

const PORT = process.env.PORT || 4001;

mongoose.promise = global.Promise;

//connect to database
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(() => {
  console.log('Database sucessfully connected')
},
  error => {
      console.log('Database could not be connected: ' + error)
  }
)

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("coderSession"));

if(process.env.ENVIRONMENT === 'development'){
  app.use(logger('dev'));
  // app.use(express.static(path.join(__dirname, 'public')));

  // corsOptions = {
  //   origin: 'http://localhost:3000',
  //   credentials: true
  // };
} 
// else if(process.env.ENVIRONMENT === 'production'){
//   app.use(express.static(path.join(__dirname, 'client', 'build')));
//   corsOptions = {
//     origin: 'https://conceptualcoder.herokuapp.com/',
//     credentials: true
//   };
// } 

app.use(express.static(path.join(__dirname, 'client', 'build')));


//app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({ 
  secret: 'coderSession',
  resave: false, 
  saveUninitialized: false,
  cookie: { secure: false, httpOnly: false }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/new', newRouter);
app.use('/article', articleRouter);
app.use('/delete', deleteRouter);
app.use('/users', userRouter);
app.use('/edit', editRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
})

module.exports = app;