const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const portfolioSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    models: [{ type: Schema.Types.ObjectId, ref: 'Model' }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Portfolio', portfolioSchema);
