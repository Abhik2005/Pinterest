const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/pinterest");

const userSchema =  mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: String,
  dateOfBirth: {
    type: Date,
    required: true
  },
  fullName: String,
  email: String,
  following: {
    type: Array,
    default: []
  },
  followers: {
    type: Array,
    default: []
  },
  profileImage: String,
  boards: {
    type: Array,
    default: []
  },
  createDate: {
    type: Date,
    default: Date.now()
  }
});

userSchema.plugin(plm);

module.exports = mongoose.model("User",userSchema)