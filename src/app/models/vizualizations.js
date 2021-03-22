import Mongoose from 'mongoose';

const visualizations = Mongoose.Schema({
  player: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'players',
  },
  club: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'clubs',
  },
});

export default Mongoose.model('visualizations', visualizations);
