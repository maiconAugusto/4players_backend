import Mongoose from 'mongoose';

const players = Mongoose.Schema({
  fullName: { type: 'string', required: false },
  playerAge: { type: 'string', required: false },
  position: { type: Array, required: false },
  profile: { type: 'string', required: false },
  profile_path: { type: 'string', required: false },
  playerHeight: { type: Number, required: false },
  club: { type: 'string', required: false },
  nationality: { type: 'string', required: false },
  phone: { type: 'string', required: false },
  dominantfoot: { type: 'string', required: false },
  country: { type: 'string', required: false },
  account: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'accounts',
  },
});
export default Mongoose.model('players', players);
