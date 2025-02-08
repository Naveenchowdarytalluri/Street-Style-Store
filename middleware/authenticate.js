const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key';

module.exports = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'Access denied' });

  jwt.verify(token, secretKey, (err) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    next();
  });
};
