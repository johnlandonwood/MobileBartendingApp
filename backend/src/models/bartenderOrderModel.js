import { setAuthorizationTokenHeaderUsingMasterKey } from '@azure/cosmos';
import mongoose from 'mongoose';

const bartenderOrderSchema = new mongoose.Schema ({
    title: {
        type: String,
        // required: true,
    },
    timePlaced: {
        type: String,
        default: Date,
        // required: true,
    },
    placedBy: {
        type: String,
        // required: true,
    },
    drinks: [{
        additionalNotes: String,
        category: String,
        description: String,
        item_name: String,
        price: Number,
        qty: Number,
        _id: mongoose.Schema.Types.ObjectId
    }],
    status: {
        type: String,
        // required: true,
    },
    timeFulfilled: {
        type: String,
        // required: true,
    },

},
{
    collection: 'orders'
});

export default mongoose.models?.bartenderOrder || mongoose.model('bartenderOrder', bartenderOrderSchema)