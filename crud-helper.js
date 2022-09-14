require('dotenv').config();
require('./config/database');

const Model = require('./models/model');
const Portfolio = require('./models/portfolio');

let model, portfolio;
let models, portfolios;
