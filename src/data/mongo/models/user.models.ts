import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    img: {
        type: String,
    },
    role: {
        type: [String],
        default: 'USER',
        enum: ['SUPER_ADMIN', 'ADMIN', 'USER'],
    },
    google: {
        type: Boolean,
        default: false
    },

    created: {

        type: Date,
        default: Date.now
    },
});

export const UserModel = mongoose.model('user', userSchema);
