// import mongoose from 'mongoose';
const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  role: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  action: [{
    place: String,
    date: String,
  }],
  profession: String,
  working: { type: Boolean, default: false },
  message: [String],
});

// const UserModel = mongoose.model('User', UserSchema);
// export default UserModel;

module.exports = model('User', UserSchema);

