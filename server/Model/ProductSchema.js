
const monogoose = require('mongoose');

const ProductSchema = new monogoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
    },
    price: {
        type: Number,
        required: [true, 'Product must have a price'],
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [50, 'Description must be less than 500 characters'],
        minlength: [3, 'Description must be more than 3 characters'],
    },
    imageArray: [
        {
            type: String,
            required: [true, 'Please add an image that displays the product'],
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = monogoose.model('Product', ProductSchema);