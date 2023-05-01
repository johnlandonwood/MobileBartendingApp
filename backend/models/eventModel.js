import mongoose from 'mongoose';
// import User from './guestModel.js';
import BartendingCompany from './bartendingCompanyModel.js';

const eventSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true,
        trim: true
    },
    host: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BartendingCompany',
    },
    location: {
        type: [Number],
        required: true,
        index: '2dsphere'
    },
    radius: {
        type: Number,
    },
    start_time: {
        type: Date,
        required: true,
        trim: true
    },
    end_time: {
        type: Date,
        required: true,
        trim: true
    },
    open_bar: {
        type: Boolean
    },
    public_event: {
        type: Boolean
    },
    archived: {
        type: Boolean
    },
    deleted: {
        type: Boolean
    },
});

export default mongoose.models?.Event || mongoose.model('Event', eventSchema)