const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },

   phone: {
    type: String,
    required: true,
  },

   dob: {
    type: Date,
    required: true,
  },

   gender: {
    type: String,
    required: true,
  },

   password: {
    type: String,
    required: true,
  },

   role: {
    type: String,
    required: true,
  },

   createdAt: {
    type: Date,
    default: Date.now,
  }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
