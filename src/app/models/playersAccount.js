import Mongoose from 'mongoose';

const players = Mongoose.Schema({
  fullName: { type: 'string', required: true },
  playerAge: { type: 'string', required: true },
  position: { type: Object, required: true },
  profile: { type: 'string', required: false },
  account: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'accounts',
  },
});
export default players;
