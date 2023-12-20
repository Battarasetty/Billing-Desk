import mongoose from 'mongoose';

const billSchema = new mongoose.Schema({
    total_amount: {
        type: Number,
        required: true,
        min: 0,
    },
    items: [
        {
            item: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Item',
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
            },
        },
    ],
},
    { timestamps: true }
);

const Bill = mongoose.model('Bill', billSchema);

export default Bill;
