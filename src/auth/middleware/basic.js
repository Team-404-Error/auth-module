'user strict';

const base64 = require('base-64');
const User = require('../models/users');

module.exports = async (req, res, next) => {
  if(!req.headers.authorization) { return 'Not authorized'}
  let basic = req.headers.authorization.split(' ').pop();
  let [username, password] = base64.decode(basic).split(':');

  try {
    req.user = await User.authenticateBasic(username, password)
    next();
  } catch(error) {
    res.status(403).send('Not authorized');
  }
}
