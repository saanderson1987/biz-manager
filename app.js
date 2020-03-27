var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');
var helmet = require('helmet');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(helmet());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'anderson',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 100 * 60 * 60 * 24 * 30} // = 30 days
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

const User = require('./models/user.js');

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.getByQuery({username})
      .then(function (users) {
        const user = Object.values(users)[0];
        const isCorrectPassword = bcrypt.compareSync(password, user.password);
        if (isCorrectPassword) return done(null, user);
        return done(null, false);
      })
  }
));

passport.serializeUser(function(user, done) { // Standered Serialize for session
   done(null, user.id)
})

passport.deserializeUser(function(id, done) {
  User.getById(id)
    .then(function(user) {
      done(null, user);
    });
})

// app.get('/api/isAuthenticated', (req, res) => {
//   res.send(req.isAuthenticated());
// })

// Post request handling route for login
// app.post('/login', passport.authenticate('local', { successRedirect: '/testGuard',
//         failureRedirect: '/testGuard'}));
app.post('/login', passport.authenticate('local', { successRedirect: '/api/isAuthenticated',
        failureRedirect: '/api/isAuthenticated'}));

// Standerd middleware taking req, res and next as parameters
function loggedIn(req, res, next) {
    if (req.isAuthenticated()) { // if request contains the user
        next(); // call next
    } else {
        res.status(403).send("Unauthorized")  // throwing unauthorized
    }
}

// Protected route
app.get('/testGuard',loggedIn, (req,res)=>{
  res.send("YOU ARE AUTHENTICATED");
  console.log("YOU ARE AUTHENTICATED");

})

// Handle logout
app.get('/logout',(req,res)=>{
    req.logout();
    // res.send("YOU ARE NOW LOGGED OUT")
    res.send(req.isAuthenticated());
})

const setRoutes = require('./routes/set_routes');
setRoutes(app);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

// app.use(function(req, res, next) {
//   if (req.isAuthenticated()) {
//     setRoutes(app);
//   } else {
//     res.send('Please log in');
//   }
// });


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
