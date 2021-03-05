import Mongoose from 'mongoose';

const favoritesPlayers = Mongoose.Schema({
  player: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'players',
  },
  account: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'accounts',
  },
});
export default Mongoose.model('favoritesPlayers', favoritesPlayers);
