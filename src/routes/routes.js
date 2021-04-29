'use strict';

const express = require('express');

const routes = express.Router();
const Users = require('../auth/models/users');
const basic = require('../auth/middleware/basic');
const bearer = require('../auth/middleware/bearer');
const can = require('../auth/middleware/acl');

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
  res.status(200).json(user)
});

// PROBABLY REDIRECT TO THE ADMIN
routes.get('/users', bearer, async (req, res, next) => {
  const users = await User.find({});
  const list = users.map(user => user.username);
  res.status(200).json(list);
});

// routes.put('/edit', async (req, res, next) => {

// });

// routes.delete('/delete', async (req, res, next) => {

// });

module.exports = routes;
