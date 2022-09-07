const Model = require('../../models/model');


module.exports = {
  create,
  getAll
}

async function getAll(req, res) {
  const models = await Model.find({
    user: req.user._id
  })
  res.json(models);
}

async function create(req, res) {
  try {
    const model = await Model.create(req.body);
    model.user = req.user._id
    model.save();
    res.json(model);
  } catch (err) {
    res.status(400).json(err);
  }
}