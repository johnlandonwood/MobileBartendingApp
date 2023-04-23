import mongoose from 'mongoose';
import userSchema from './userModel.js';
import bartendingCompanySchema from './bartendingCompanyModel.js';

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
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BartendingCompany',
    },
    location: {
        type: [Number],
        required: true,
        index: '2dsphere'
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