import Mongoose from 'mongoose';

const database = Mongoose.connect(process.env.MONGO, { useNewUrlParser: true });
export default database;
