'use strict';

// =============== 3RD PARTY DEPENDENCIES =======
const express = require('express');
const routes = express.Router();

// =============== ESOTERIC FILES ===============
const Users = require('../auth/models/users.js');
const basic = require('../auth/middleware/basic.js');
const bearer = require('../auth/middleware/bearer.js');
const can = require('../auth/middleware/acl.js');

// =============== ROUTES =======================
// --------------- LOGIN PAGE ---------------
routes.get('/', (req, res) => {
  res.render('index')
})

// --------------- PROFILE PAGE ---------------
routes.get('/profile', (req, res) => {
  res.redict('profile')
})

// --------------- SIGNUP ROUTE ---------------
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

// --------------- SIGNIN ROUTE ---------------
routes.post('/signin', basic, (req, res, next) => {
  // REMOVE AFTER TESTING
  const user = {
    user: req.user,
    token: req.user.token
  };
  // CHANGE 'OUTPUT' AFTER TESTING
  // PROBABLY CHANGE TO A REDIRECT
  console.log(user);
  res.status(200).json(user)
});

// --------------- USERS ROUTE ---------------
// PROBABLY REDIRECT TO THE ADMIN
routes.get('/users', bearer, async (req, res, next) => {
  const users = await Users.find({});
  const list = users.map(user => user.username);
  res.status(200).json(list);
});

// --------------- SECRET ROUTE ---------------
routes.get('/secret', bearer, can('delete'), async (req, res, next) => {
  res.status(200).send('Welcome to the secret space!')
});

// --------------- DELETE ROUTE ---------------
routes.delete('/delete', bearer, async (req, res, next) => {
  console.log(req.user._id);
  const deletedUser = await Users.findByIdAndDelete(req.user._id)
  res.status(200).send(deletedUser)
});

module.exports = routes;
