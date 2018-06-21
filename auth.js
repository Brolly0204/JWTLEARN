const jwt = require('jwt-simple');
const { SECRET } = require('./config');

module.exports = function (req, res, next) {
  let authorization = req.headers['authorization'];
  if (authorization) {
    try {
      let decoded = jwt.decode(authorization.split(' ')[1], SECRET);
      req.user = decoded.user;
      next();
    } catch (e) {
      res.sendStatus(401).send('Not Allowed');
    }
  } else {
    res.sendStatus(401).send('Not Allowed');
  }
};
