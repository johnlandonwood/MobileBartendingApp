import mongoose from 'mongoose';
import item from './itemModel.js';
import bartender from './bartenderModel.js';

const order = new mongoose.Schema ({
    items: {
        type: [item]
    },
    time_requested: {

    },
    status: {
        type: String,
        lowercase: true,
        enum: ["in queue", "preparing", "ready to pickup"],
    },
    assigned_bartender: {
        type: bartender
    },
    total_price: {
        type: String
    }


});

export default order;