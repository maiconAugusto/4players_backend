import Mongoose from 'mongoose';

const accounts = Mongoose.Schema({
  email: { type: 'string', unique: true, required: true },
  password: { type: 'string', required: true },
  active: { type: Boolean, required: true },
  isDemo: { type: Boolean, required: true },
  isPlayer: { type: Boolean, required: true },
  isClub: { type: Boolean, required: true },
  isManager: { type: Boolean, required: true },
});
export default Mongoose.model('accounts', accounts);
