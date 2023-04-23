import mongoose from 'mongoose';
import order from './orderModel.js';
import event from './eventModel.js';

const queue = new mongoose.Schema ({
    orders: {
        type: [order]
    },
    event: {
        type: event
    }
});

export default queue;