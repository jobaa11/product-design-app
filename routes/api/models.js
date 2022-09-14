const express = require('express');
const router = express.Router();
const modelsCtrl = require('../../controllers/api/models');

/* /api/models/ */

router.post('/new', modelsCtrl.create);

module.exports = router;
