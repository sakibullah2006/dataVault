import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    hashedPassword: {
        type: String,
        required: true,
    },
})

export default mongoose.model('Auth', authSchema);