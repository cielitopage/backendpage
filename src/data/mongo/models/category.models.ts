import mongoose, { Schema } from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true
    },
    available: {
        type: Boolean,
        default: true
    },
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'user',
        required: [true, 'User is required'],
    },   
    created: {

        type: Date,
        default: Date.now
    },
});

categorySchema.methods.toJSON = function() {
    const obj = this.toObject();
    delete obj.__v;
    return obj;
};



export const CategoryModel = mongoose.model('category', categorySchema);
