const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
    quantity: { type: Number, required: true, default: 1 },
  }],
},{ collection: 'cart' });

module.exports = mongoose.models.Cart || mongoose.model('Cart', cartSchema);
