import Mongoose from 'mongoose';

const clubs = Mongoose.Schema({
  fullName: { type: 'string', required: false },
  stadium: { type: 'string', required: false },
  technician: { type: 'string', required: false },
  foundation: { type: 'string', required: false },
  president: { type: 'string', required: false },
  championships: { type: 'string', required: false },
  webSite: { type: 'string', required: false },
  country: { type: 'string', required: false },
  profile: { type: 'string', required: false },
  profile_path: { type: 'string', required: false },
  phone: { type: 'string', required: false },
  isManager: { type: Boolean, required: true },
  account: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'accounts',
  },
});
export default Mongoose.model('clubs', clubs);
