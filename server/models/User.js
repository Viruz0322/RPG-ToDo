const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  }
});

const Matchup = model('user', userSchema);

module.exports = Matchup;
