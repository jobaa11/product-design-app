// Connect to the database
require('dotenv').config();
require('./config/database');

// Require the Mongoose models
const Model = require('./models/model');
const Portfolio = require('./models/portfolio');


// Local variables will come in handy for holding retrieved documents
let model, portfolio
let models, portfolios
