const mongoose = require('mongoose');
const { DBUrl } = require('./config');
const conn = mongoose.createConnection(DBUrl);
const UserSchema = new mongoose.Schema({
  username: String,
  password: String
});
exports.User = conn.model('User', UserSchema);