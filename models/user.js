const mongoose = require('mongoose')
const plm = require('passport-local-mongoose')
const User = new mongoose.Schema({
    username: String,
    password: String,
})

User.plugin(plm);

 //make public
module.exports = mongoose.model('User',User)