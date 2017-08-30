const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    password: String,
    display: String,
    topWave: Number
});


const Users = mongoose.model('Users', UserSchema);

module.exports = Users;