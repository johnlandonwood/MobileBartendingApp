import mongoose from 'mongoose';
import user from './guestModel.js';

const event = new mongoose.Schema ({
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
    //     type: bartendingcompany,
    //     required: true
    // },
    location: {
        
    },
    date_of_event: {
        type: String,
        required: true,
        trim: true
    },
    start_time: {
        type: String,
        required: true,
        trim: true
    },
    end_time: {
        type: String,
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
    //     type: [user]
    // },
    // archived: {
    //     type: Boolean
    // },
    // deleted: {
    //     type: Boolean
    // }
});

export default event