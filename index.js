'use strict';

// =============== 3rd party ===============
require('dotenv').config();
const mongoose = require('mongoose');

// =============== files import ===============
const server = require('./src/server.js');
const PORT = process.env.PORT || 3000;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
};

mongoose.connect(process.env.MONGODB_URI, options);

server.start(PORT);
