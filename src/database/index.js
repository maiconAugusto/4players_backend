import Mongoose from 'mongoose';

require('dotenv').config();

const database = Mongoose.connect(process.env.MONG,
  { useNewUrlParser: true, useUnifiedTopology: true });
export default database;
