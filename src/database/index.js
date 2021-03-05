import Mongoose from 'mongoose';

require('dotenv').config();

const database = Mongoose.connect(process.env.MONGO,
  { useNewUrlParser: true, useUnifiedTopology: true });
export default database;
