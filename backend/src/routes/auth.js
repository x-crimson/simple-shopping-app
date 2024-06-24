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
router.put('/:id', authMiddleware, updateUser); 
router.delete('/:id', authMiddleware, deleteUser);
router.get('/:id', authMiddleware, getUser); 
router.get('/', getUsers);

module.exports = router;
