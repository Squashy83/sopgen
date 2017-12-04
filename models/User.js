var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  name: String,
  surname: String,
  position: String,
  userid: String,
  password: String,
  telcode: String,
  mailcode: String,
  updated_date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('User', UserSchema);
