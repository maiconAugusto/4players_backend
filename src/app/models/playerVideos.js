import Mongoose from 'mongoose';

const playerVideo = Mongoose.Schema({
  video: { type: 'string', required: false },
  video_path: { type: 'string', required: false },
  account: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'accounts',
  },
  userId: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'players',
  },
});

export default Mongoose.model('playerVideo', playerVideo);
