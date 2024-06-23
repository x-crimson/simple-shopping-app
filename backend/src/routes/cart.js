const express = require('express');
const { getCart, addItemToCart, removeItemFromCart } = require('../controllers/cartController');
const cache = require('../middleware/cache');
const router = express.Router();

router.get('/:userId', cache, getCart);
router.post('/:userId', addItemToCart);
router.delete('/:userId/:itemId', removeItemFromCart);

module.exports = router;
