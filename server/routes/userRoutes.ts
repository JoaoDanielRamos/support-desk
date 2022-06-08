import express from 'express';
const router = express.Router();
import { registerUser, loginUser, getMe } from '../controllers/userController';

const { protect } = require('../middleware/authMiddleware');

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);

module.exports = router;
