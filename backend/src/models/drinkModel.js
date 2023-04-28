import mongoose from 'mongoose';

const drinkItemModel = new mongoose.Schema ({
    item_name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true
    },
    // imageUrl: {
    //     type: String,
    //     // required: true,
    //     trim: true,
    // },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
        trim: true,
        enum: ['Beer', 'Wine', 'Liquor', 'Mixed Drink', 'Non-Alcoholic']
    },
    // company: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'BartendingCompany',
    // },
},
{
    collection: 'items'
});

export default mongoose.models?.DrinkItem || mongoose.model('DrinkItem', drinkItemModel)
