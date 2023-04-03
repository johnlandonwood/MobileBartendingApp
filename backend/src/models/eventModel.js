import mongoose from 'mongoose';
import userSchema from './userModel.js';
import bartendingCompanySchema from './bartendingCompanyModel.js';

const eventSchema = new mongoose.Schema ({
    event_name: {
        type: String,
        required: true,
        trim: true
    },
    host: {
        type: String,
        required: true,
        trim: true
    },
    // bartending_company: {
    //     type: bartendingCompanySchema.schema,
    //     required: false
    // },
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
    }
    // add drink list
    // ,
    // bartenders: {
    //     type: [userSchema]
    // },
    // archived: {
    //     type: Boolean
    // },
    // deleted: {
    //     type: Boolean
    // }
});

export default mongoose.models?.Event || mongoose.model('Event', eventSchema)