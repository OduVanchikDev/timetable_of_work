import mongoose from 'mongoose';

const StatSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },

  tems: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tema',
  },

})


let StatModel = mongoose.model('Stat', StatSchema)
export default StatModel
