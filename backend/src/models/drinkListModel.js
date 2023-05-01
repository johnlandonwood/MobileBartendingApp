import mongoose from 'mongoose';
import DrinkItem from '../models/drinkModel.js';


const drinkListSchema = new mongoose.Schema ({
    // bartending_company: {
    //     type: bartendingcompany,
    //     required: true
    // },
    drink_list_name: {
        type: String,
        required: true
    },
    item_list: [{type: mongoose.Schema.Types.ObjectId, ref: 'DrinkItem'}]
});

export default mongoose.models?.DrinkList || mongoose.model('DrinkList', drinkListSchema);