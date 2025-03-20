import User from '../models/User.js';
import Vault from '../models/Vault.js';

// * @desc    Create a new vault
export const createVault = async (req, res) => {
    const { title, data } = req.body;
    const { username } = req.query;

    if (!title || !data) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const newVault = new Vault({ userId: user._id, title: title, data: data });
        newVault.save();
        res.status(201).json({ message: 'Vault created successfully', newVault });
    } catch (error) {
        res.status(400).json({ message: 'Server Error' });
    }
}

// * @desc    Get all vaults
export const getVaults = async (req, res) => {
    const { username } = req.query;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const vaults = await Vault.find({ userId: user._id });
        res.json(vaults);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }

}

// * @desc    Get a single vault
export const getOneVault = async (req, res) => {
    const { id } = req.params;
    const { username } = req.query;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const vault = await Vault.findOne({ _id: id, userId: user._id });
        res.json(vault);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

// * @desc    Update a vault
export const updateVault = async (req, res) => {
    const { id } = req.params;
    const { username } = req.query;
    const { title, data } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const vault = await Vault.findOne({ _id: id, userId: user._id });
        if (!vault) {
            return res.status(404).json({ error: 'Vault not found' });
        }

        vault.title = title || vault.title;
        vault.data = data || vault.data;
        vault.save();
        res.status(200).json({ message: 'Vault updated successfully', vault });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

// * @desc    Delete a vault
export const deleteVault = async (req, res) => {
    const { id } = req.params;
    const { username } = req.query;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const vault = await Vault.findOneAndDelete({ _id: id, userId: user._id });
        if (!vault) {
            return res.status(404).json({ error: 'Vault not found' });
        }
        res.json({ message: 'Vault deleted successfully', vault });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}