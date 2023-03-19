const { Schema, model } = require('mongoose');

const choreSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ""
  },
  isComplete: {
    type: Boolean,
    default: false
  },
  weight: {
    warrior: Number,
    healer: Number,
    scholar: Number
  }
});

const  Chore = model('chore', choreSchema);

module.exports = Chore;