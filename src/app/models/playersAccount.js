import Mongoose from 'mongoose';

const players = Mongoose.Schema({
  fullName: { type: 'string', required: true },
  playerAge: { type: 'string', required: true },
  position: { type: Array, required: true },
  profile: { type: 'string', required: false },
  profile_path: { type: 'string', required: false },
  playerHeight: { type: Number, required: false },
  country: { type: 'string', required: false },
  account: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'accounts',
  },
});
export default Mongoose.model('players', players);
