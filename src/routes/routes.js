'use strict';

const express = require('express');
const routes = express.Router();

const Users = require('../auth/models/users.js');
const basic = require('../auth/middleware/basic.js');
const bearer = require('../auth/middleware/bearer.js');
const can = require('../auth/middleware/acl.js');

routes.post('/signup', async (req, res, next) => {
  try {
    let user = new Users(req.body);
    const userRecord = await user.save();
    // REMOVE AFTER TESTING
    const output = {
      user: userRecord,
      token: userRecord.token
    };
    // CHANGE 'OUTPUT' AFTER TESTING
    // PROBABLY CHANGE TO A REDIRECT
    res.status(201).json(output)
  } catch(error) {
    next(error.message)
  }
});

routes.post('/signin', basic, (req, res, next) => {
  // REMOVE AFTER TESTING
  const user = {
    user: req.user,
    token: req.user.token
  };
  // CHANGE 'OUTPUT' AFTER TESTING
  // PROBABLY CHANGE TO A REDIRECT
  console.log("SIGN IN: ", user)
  res.status(200).json(user)
});

// PROBABLY REDIRECT TO THE ADMIN
routes.get('/users', bearer, async (req, res, next) => {
  const users = await Users.find({});
  const list = users.map(user => user.username);
  res.status(200).json(list);
});

routes.get('/secret', bearer, can('delete'), async (req, res, next) => {
  res.status(200).send('Welcome to the secret space!')
});

routes.put('/edit', async (req, res, next) => {

});

routes.delete('/delete', bearer, async (req, res, next) => {
  console.log(req.user._id);
  const deletedUser = await Users.findByIdAndDelete(req.user._id)
  res.status(200).send(deletedUser)
});

module.exports = routes;
