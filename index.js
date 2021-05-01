'use strict';

// =============== 3RD PARTY DEPENDENCIES ===============
require('dotenv').config();
const mongoose = require('mongoose');

// =============== ESOTERIC FILES ===============
const server = require('./src/server.js');
const PORT = process.env.PORT || 3000;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
};

mongoose.connect(process.env.MONGODB_URI, options);

server.start(PORT);
