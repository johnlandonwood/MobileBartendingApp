import mongoose from 'mongoose';

const drinkItemModel = new mongoose.Schema ({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true
    },
    imageUrl: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
        trim: true,
        enum: ['beer', 'wine', 'non-alcoholic']
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BartendingCompany',
    },
});

export default mongoose.models?.DrinkItem || mongoose.model('DrinkItem', drinkItemModel)