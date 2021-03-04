import Mongoose from 'mongoose';

const clubs = Mongoose.Schema({
  stadium: { type: 'string', required: false },
  technician: { type: 'string', required: false },
  foundation: { type: 'string', required: false },
  president: { type: 'string', required: false },
  championships: { type: Array, required: false },
  webSite: { type: 'string', required: false },
  favoritePlayers: { type: Array, required: false },
  account: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'accounts',
  },
});
export default clubs;
