const express = require('express');
const router = express.Router();
const modelsCtrl = require('../../controllers/api/models');

// POST /api/models/new
router.post('/new', modelsCtrl.create);


module.exports = router;