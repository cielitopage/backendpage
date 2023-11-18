import mongoose, { Schema } from "mongoose";


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
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
    category: { 
        type: Schema.Types.ObjectId, 
        ref: 'category',
        required: [true, 'Category is required'],
    },
    price: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
    },
    img: {
        type: String,
    },
    edad: {
        type: [String],
        default: '0-3',
        enum: ['0-3', '3-6', '6-9', '9-12'],
    },
    talla: {
        type: [String],
        default: 'S',
        enum: ['S', 'M', 'L'],
    },
    
    created: {

        type: Date,
        default: Date.now
    },
});

productSchema.methods.toJSON = function() {
    const obj = this.toObject();
    delete obj.__v;
    return obj;
};

export const ProductModel = mongoose.model('product', productSchema);