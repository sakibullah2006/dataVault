import Auth from '../models/Auth.js';
import User from '../models/User.js';
import { hashPassword } from '../utils/hashPassword.js';

// * @desc    Register a new user
export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    // * check if user exists
    const userExists = await User.findOne({ username })
    if(userExists) {
        return res.status(400).json({ message: 'User already exists' })
    }
    // * create a new user
    try {
        const user = new User({ username, email })
        await user.save()

        const hashedPassword = hashPassword(password);
        const auth = new Auth({ username, hashedPassword })
        auth.save()

        res.status(201).json({ message: "User created Successfully!", user})
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// * delete an existing user 
export const deleteUser = async (req, res) => {
    const { username } = req.query;
    const userExists = await User.findOne({ username})
    if(!userExists) {
        return res.status(404).json({ message: 'User does not exist' })
    }

    try {
        const user = await User.findOneAndDelete({ username })
        await Auth.findOneAndDelete({ username })
        res.status(200).json({ message: "User deleted successfully", user })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json( users )
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
