import Mongoose from 'mongoose';

const favoritesClub = Mongoose.Schema({
  club: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'clubs',
  },
  account: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'accounts',
  },
});
export default Mongoose.model('favoritesClub', favoritesClub);
