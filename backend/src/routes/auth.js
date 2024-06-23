const express = require('express');
const {
  signup,
  login,
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.put('/:id', authMiddleware, updateUser); // Secure the route with auth middleware
router.delete('/:id', authMiddleware, deleteUser); // Secure the route with auth middleware
router.get('/:id', authMiddleware, getUser); // Optional: Secure if only authenticated users should view their own data
router.get('/', getUsers);

module.exports = router;
