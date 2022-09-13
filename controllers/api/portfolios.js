const Model = require('../../models/model');
const Portfolio = require('../../models/portfolio')



module.exports = {
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


async function edit(req, res) {
  try {
    const edit = await Model.findByIdAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true })
    edit.save()
    res.json(edit)
  } catch (err) {
    res.status(400).json(err)
  }
}

async function deleteModel(req, res) {
  await Model.findByIdAndDelete(req.params.id)
  await Portfolio.updateOne({ user: req.user._id }, {
    $pullAll: {
      models: [{ _id: req.params.id }]
    },
  }).exec()
}

