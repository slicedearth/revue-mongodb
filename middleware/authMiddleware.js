const configs = require('config');
const jwt = require('jsonwebtoken');

authMiddleware = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).send('Access Denied! No token provided.');
  }
  try {
    const decoded = jwt.verify(token, configs.get('jwtPrivateKey'));
    req.user = decoded;
    if (!req.user._id) {
      return res.status(403).send('Access Denied!');
    }
    next();
  } catch (ex) {
    res.status(400).send('Invalid Token');
  }
};

module.exports = authMiddleware;
