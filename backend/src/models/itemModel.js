import mongoose from 'mongoose';


const itemSchema = new mongoose.Schema ({
    // bartending_company: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'bartendingCompanyModel',
    //     required: true
    // },
    item_name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    // add_ons: {
    //     type: [String]
    // },
    price: {
        type: String
    },
    category: {
        type: String,
        enum: ['Beer', 'Wine', 'Liquor', 'Mixed Drink', 'Non-Alcoholic'],
        required: true
    }
},
{
    collection: 'items'
});

export default mongoose.models?.Item || mongoose.model('Item', itemSchema);