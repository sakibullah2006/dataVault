import express from 'express';
import { createVault, deleteVault, getOneVault, getVaults, updateVault } from '../controllers/vaultController.js';
import { verifyPassword } from '../middleware/verifyPassword.js';

const router = express.Router();

router.use(verifyPassword)

// * @desc    Create a new vault
router.post('/create', createVault);

// * @desc    Get all vaults
router.get('/', getVaults);

// * @desc    Get a single vault
router.get('/:id', getOneVault);

// * @desc    Delete a single vault
router.delete('/:id', deleteVault);

// * @desc    Update a single vault
router.put('/:id', updateVault);

export default router;