const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  chores: [{ type: Schema.Types.ObjectId, ref: "chore" }],
  // [Schema.Types.ObjectId],
  rewards: [Schema.Types.ObjectId],
  warriorExp: Number,
  healerExp: Number,
  scholarExp: Number,
});

const User = model("user", userSchema);

module.exports = User;
