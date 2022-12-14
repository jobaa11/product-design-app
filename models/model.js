const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    name: String,
    product: { type: String, required: true },
    description: String,
    mesh: String,
    stripes: String,
    sole: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Model', modelSchema);
