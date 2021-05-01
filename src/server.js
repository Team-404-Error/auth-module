'use strict';

// =============== 3RD PARTY DEPENDENCIES ===============
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes/routes');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(upload.array());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({ extended: true }));

// =============== ROUTES ===============
app.use(routes);

module.exports = {
  server:app,
  start: port => {
    if(!port) { throw new Error('Missing Port'); }
    app.listen(port, () => console.log(`List on http://localhost:${port}`));
  }
};
