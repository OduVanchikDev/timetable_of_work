import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },

  tems: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tema',
  },

})


let UserModel = mongoose.model('User', UserSchema)
export default UserModel
