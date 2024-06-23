const Cart = require('../models/Cart');
const redisClient = require('../config/redisClient');

exports.getCart = async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await Cart.findOne({ userId }).populate('items.itemId');
    await redisClient.set(`cart:${userId}`, JSON.stringify(cart));
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addItemToCart = async (req, res) => {
  const { userId } = req.params;
  const { itemId, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [{ itemId, quantity }] });
    } else {
      const itemIndex = cart.items.findIndex(item => item.itemId.toString() === itemId);
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ itemId, quantity });
      }
    }
    await cart.save();
    await redisClient.set(`cart:${userId}`, JSON.stringify(cart));
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.removeItemFromCart = async (req, res) => {
  const { userId, itemId } = req.params;
  try {
    let cart = await Cart.findOne({ userId });
    if (cart) {
      cart.items = cart.items.filter(item => item.itemId.toString() !== itemId);
      await cart.save();
      await redisClient.set(`cart:${userId}`, JSON.stringify(cart));
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
