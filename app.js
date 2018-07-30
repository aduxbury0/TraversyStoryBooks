const express = require("express");
const mongoose = require("mongoose");
const passport = require('passport');
const app = express();

//Passport config
require('./config/passport')(passport);


//Loading Routes 
const auth = require('./routes/auth');

app.get('/', (req, res) => {
    res.send('It works');

})

//Use Routes
app.use('/auth', auth);


const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server stated on port: `+port);

});