import { setAuthorizationTokenHeaderUsingMasterKey } from '@azure/cosmos';
import mongoose from 'mongoose';


const drinkSchema = new mongoose.Schema ({
    name: {
        type: String,
        //required: true,
    },
    additionalInstructions: {
        type: String,
        // required: true,
        // default: "",
    },
    type: {
        type: String,
        //required: true,
    },
    quantity: {
        type: Number,
        //required: true,
    },

}, {_id: false });

const bartenderOrderSchema = new mongoose.Schema ({
    title: {
        type: String,
        required: true,
    },
    timePlaced: {
        type: String,
        default: Date,
        // required: true,
    },
    placedBy: {
        type: String,
        required: true,
    },
    drink1: drinkSchema,
    drink2: {
        type: drinkSchema,
        required: false,
    },
    status: {
        type: String,
        required: true,
    },
    timeFulfilled: {
        type: String,
        // required: true,
    },

});

export default mongoose.models?.bartenderOrder || mongoose.model('bartenderOrder', bartenderOrderSchema)