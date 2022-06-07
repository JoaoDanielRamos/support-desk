import express from 'express';
const router = express.Router();
import { registerUser, loginUser } from '../controllers/userController';

router.post('/', registerUser);

router.post('/login', loginUser);

module.exports = router;
