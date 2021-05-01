'user strict';

const users = require('../models/users');

module.exports = async (req, res, next) => {
  console.log(req)
  try {
    if(!req.headers.authorization) { next('invalid login')}
    const token = req.headers.authorization.split(' ').pop();
    const validUser = await users.authenticateWithToken(token);
    console.log("BEARER REQ: ", req.headers)
    console.log("BEARERER: ", )
    req.user = validUser;
    req.token = validUser.token
    next()
  } catch (error) {
    res.status(403).send('Invalid Login');
  }
}
