import admin from 'firebase-admin';
import dotenv from 'dotenv';
import serviceAccount from './serviceAccountKey.json';

dotenv.config();

const data = serviceAccount;

admin.initializeApp({
  credential: admin.credential.cert(data),
  storageBucket: process.env.KEY,
});
const bucket = admin.storage().bucket();
export default bucket;
