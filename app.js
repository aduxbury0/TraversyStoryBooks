const express = require("express");
const mongoose = require("mongoose");
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

//Load Models
require('./models/User');
require('./models/Story');

//Passport config
require('./config/passport')(passport);

//load Routes 
const index = require('./routes/index');
const auth = require('./routes/auth');
const stories = require('./routes/stories');

//Keys
const keys = require('./config/keys');

//Handlebars helpers
const {
    truncate,
    stripTags,
    formatDate,
    select,
    editIcon
} = require('./helpers/hbs');

//Mongoose setup
mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true
})
    .then( () => { console.log('mongoDB connected...') })
    .catch(err => console.log(err));

//initialise express
const app = express();

//Body-parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Method override middleware
app.use(methodOverride('_method'));


//Handlebars middleware
app.engine('handlebars', exphbs({
    helpers:{
        truncate: truncate,
        stripTags: stripTags,
        formatDate: formatDate,
        select: select,
        editIcon: editIcon
    },
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

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Use Routes
app.use('/', index);
app.use('/auth', auth);
app.use('/stories', stories);

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server stated on port: `+port);

});