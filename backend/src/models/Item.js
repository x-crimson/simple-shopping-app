const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
},{ collection: 'items' });

module.exports = mongoose.models.Item || mongoose.model('Item', itemSchema);
