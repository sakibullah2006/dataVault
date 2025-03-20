import express from 'express';
import { deleteUser, getUsers, registerUser } from '../controllers/userController.js';
import { verifyPassword } from '../middleware/verifyPassword.js';

const router = express.Router();

// * get all users 
router.get('/', getUsers)

// * register a new user
router.post('/register', registerUser)

// * delete an existing user
router.delete('/', verifyPassword, deleteUser)   

export default router;