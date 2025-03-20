import express from 'express';
import { deleteUser, getUsers, registerUser } from '../controllers/userController.js';

const router = express.Router();

// * get all users 
router.get('/', getUsers)

// * register a new user
router.post('/register', registerUser)

// * delete an existing user
router.delete('/delete', deleteUser)   

export default router;