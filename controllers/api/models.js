const Model = require('../../models/model');
const Portfolio = require('../../models/portfolio');


module.exports = {
  create
}

async function create(req, res) {
  try {
    const model = await Model.create(req.body);
    model.user = req.user._id
    model.save()
    if (await Portfolio.exists({ user: req.user._id })) {
      const portfolio = await Portfolio.findOne({ user: req.user._id })
      portfolio.models.push(model)
      portfolio.save()
    } else {
      const portfolio = await new Portfolio();
      portfolio.user = req.user._id
      portfolio.models.push(model)
      portfolio.save()
    }
    res.json(model);
  } catch (err) {
    res.status(400).json(err);
  }
}

