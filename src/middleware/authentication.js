import jwt from 'jsonwebtoken';

const { promisify } = require('util');

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ data: 'Invalid token' });
  }
  const [, token] = authHeader.split(' ');
  try {
    await promisify(jwt.verify)(token, process.env.HASH, { expiresIn: process.env.EXPIRESIN });
    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
