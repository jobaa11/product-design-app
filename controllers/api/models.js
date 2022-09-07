const Model = require('../../models/model');


module.exports = {
    create
}


async function create(req, res) {
    try {
      const model = await Model.create(req.body);
      console.log(req.body)
      // token is a string
      // Yes, we can serialize (to JSON) strings
      res.json(model);
    } catch (err) {
      res.status(400).json(err);
    }
  }