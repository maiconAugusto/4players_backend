import Mongoose from 'mongoose';

const playerVideo = Mongoose.Schema({
  video: { type: 'string', required: false },
  video_path: { type: 'string', required: false },
  account: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'accounts',
  },
});

export default Mongoose.model('playerVideo', playerVideo);
