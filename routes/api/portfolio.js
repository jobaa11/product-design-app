const express = require('express');
const router = express.Router();
const portfoliosCtrl = require('../../controllers/api/portfolios');

/* /api/portfolio */

router.get('/', portfoliosCtrl.getAll);
router.get('/:id', portfoliosCtrl.getOne);
router.put('/:id', portfoliosCtrl.edit)
router.delete('/:id', portfoliosCtrl.deleteModel)

module.exports = router;