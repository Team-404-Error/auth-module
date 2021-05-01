'user strict';

const base64 = require('base-64');
const User = require('../models/users');

module.exports = async (req, res, next) => {

  if(!req.headers.authorization) { return 'Not authorized'}

  let basic = req.headers.authorization.split(' ').pop();
  console.log("DECODEAD: ", base64.decode(basic))
  let rest = base64.decode(basic).split(':');
  let username = rest[0];
  let password= rest[1];
  console.log(username, password)
  try {
    req.user = await User.authenticateBasic(username, password)
    next();
  } catch(error) {
    res.status(403).send('Not authorized');
  }
}
