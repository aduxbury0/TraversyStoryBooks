const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema
const UserScheme = new Schema({
    googleID:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    firstName:{
        type: String,
    },
    lastName:{
        type: String
    },
    image:{
        type: String
    }


});

//Create collection and add schema
mongoose.model('users', UserScheme);