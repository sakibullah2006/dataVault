import Auth from '../models/Auth.js';
import { hashPassword } from '../utils/hashPassword.js';

export const verifyPassword = async (req, res, next) => {
    const { username, password } = req.query;

    // * checking if the username and password are provided
    if(!username || !password) {
        return res.status(400).json({ error: 'Invalid request' });
    }

    try {
        // * cechking if the user exists
        const auth = await Auth.findOne({ username });
        if(!auth) {
            return res.status(404).json({ error: 'User not Found!' });
        }

        // * checking if the password is correct
        const hashedPassword = hashPassword(password);
        if (auth.hashedPassword === hashedPassword) {
            next()
        } else {
            res.status(401).json({ error: 'Invalid password'})
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}