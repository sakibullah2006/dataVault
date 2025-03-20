import mongoose from "mongoose";

const vaultSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        data: {
            type: String,
            required: true,
        }

    },
    {
        timestamps: true,
    }
)


export default mongoose.model('Vault', vaultSchema);