import mongoose from 'mongoose';
// import Item from './itemModel.js';

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
});

const Item = mongoose.model('Item', itemSchema);

const drinkListSchema = new mongoose.Schema ({
    // bartending_company: {
    //     type: bartendingcompany,
    //     required: true
    // },
    drink_list_name: {
        type: String,
        required: true
    },
    item_list: [{type: mongoose.Schema.Types.ObjectId, ref: 'Item'}]
});

export default mongoose.models?.DrinkList || mongoose.model('DrinkList', drinkListSchema);