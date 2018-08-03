const express = require("express");
const mongoose = require("mongoose");
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const exphbs = require('express-handlebars');

//Load Models
require('./models/User');

//Passport config
require('./config/passport')(passport);

//load Routes 
const index = require('./routes/index');
const auth = require('./routes/auth');

//Keys
const keys = require('./config/keys');

//Mongoose setup
mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true
})
    .then( () => { console.log('mongoDB connected...') })
    .catch(err => console.log(err));

//initialise express
const app = express();

//Handlebars middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//Cookie-parser and express-session middleware
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//set global variables
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
})

//Use Routes
app.use('/', index);
app.use('/auth', auth);

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server stated on port: `+port);

});