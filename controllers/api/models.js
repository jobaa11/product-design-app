const Model = require('../../models/model');
const Portfolio = require('../../models/portfolio');


module.exports = {
  create
}

async function create(req, res) {
  try {
    const model = await Model.create(req.body);
    const portfolio = new Portfolio();
    portfolio.models.push(model)
    model.user = req.user._id
    portfolio.user = req.user._id
    model.save()
    portfolio.save()
    res.json(model);
  } catch (err) {
    res.status(400).json(err);
  }
}

