import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
    item_name: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        min: 1,
    },
},
    { timestamps: true }
);

const Item = mongoose.model('Item', itemSchema);

export default Item;
