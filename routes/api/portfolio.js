const express = require('express');
const router = express.Router();
const portfoliosCtrl = require('../../controllers/api/portfolios');


// GET /api/portfolio
router.get('/', portfoliosCtrl.getAll);
// GET /api/portfolio/:id
router.get('/:id', portfoliosCtrl.getOne);
// PUT /api/portfolio/:id
router.put('/:id', portfoliosCtrl.edit)
// DELETE /api/portfolio/:id
router.delete('/:id', portfoliosCtrl.deleteModel)

module.exports = router;