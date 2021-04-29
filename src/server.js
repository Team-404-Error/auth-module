'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes/routes');

const app = express();
app.use(express.json());



app.use(cors());
app.use(morgan('dev'));


app.use(express.urlencoded({extended: true}));
app.use(routes);

module.exports = {
  server:app,
  start: port => {
    if(!port) { throw new Error('Missing Port'); }
    app.listen(port, () => console.log(`List on http://localhost:${port}`));
  }
};
