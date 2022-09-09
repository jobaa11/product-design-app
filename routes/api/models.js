const express = require('express');
const router = express.Router();
const modelsCtrl = require('../../controllers/api/models');


// POST /api/models/portfolio
router.get('/portfolio', modelsCtrl.getAll);
// POST /api/models/new
router.post('/new', modelsCtrl.create);
// PUT /api/models/portfolio/:id
router.put('/portfolio/:id', modelsCtrl.edit)
// DELETE /api/models/portfolio/:id
router.delete('/portfolio/:id', modelsCtrl.deleteModel)

module.exports = router;