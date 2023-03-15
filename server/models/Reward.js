const { Schema, model } = require('mongoose');

const rewardSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ""
  },
  acquired: {
    type: Boolean,
    default: false
  },
  weightRequirement: {
    warrior: Number,
    healer: Number,
    scholar: Number
  }
});

const  Chore = model('reward', rewardSchema);

module.exports = Chore;