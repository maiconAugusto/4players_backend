import Mongoose from 'mongoose';

const event = Mongoose.Schema({
  profile: { type: 'string', required: false },
  profile_path: { type: 'string', required: false },
  title: { type: 'string', required: false },
  description: { type: 'string', required: false },
  url: { type: 'string', required: false },
  date: { type: 'string', required: false },
});

export default Mongoose.model('events', event);
