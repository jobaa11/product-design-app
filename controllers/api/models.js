const Model = require('../../models/model');


module.exports = {
  create,
  getAll,
  edit,
  getOne,
  deleteModel,
}

async function getAll(req, res) {
  const models = await Model.find({
    user: req.user._id
  }).exec()
  res.json(models);
}

async function getOne(req, res) {
  try {
    const model = await Model.find({ _id: req.params.id, user: req.user.id })
    res.json(model)

  } catch (err) {
    res.status(401).json(err)
  }
}

async function create(req, res) {
  try {
    const model = await Model.create(req.body);
    model.user = req.user._id
    model.save()
    // model.exec();
    res.json(model);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function edit(req, res) {
  try {
    const edit = await Model.findByIdAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }).exec()
    res.json(edit)
  } catch {
    new Error();
  }
}

async function deleteModel(req, res) {
  model = await Model.findByIdAndDelete(req.params.id)
}