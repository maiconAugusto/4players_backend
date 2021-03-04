import Mongoose from 'mongoose';

const database = Mongoose.connect('mongodb://db:27017/4players', { useNewUrlParser: true });
export default database;
