const Model = require('../../models/model');


module.exports = {
  create,
  getAll,
  edit,
  deleteModel,
  show
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

async function edit(req, res) {
  try {
    const edit = await Model.findByIdAndUpdate(req.params.id)
    console.log(req.user._id, edit)
    res.json(edit)
  } catch {
    new Error();
  }
}
async function show(req, res) {
  const model = await Model.findById(req.params.id)
  res.json(model)
}

async function deleteModel(req, res) {
  model = await Model.findByIdAndDelete(req.params.id)
  console.log(model)
  res.json(model)
}