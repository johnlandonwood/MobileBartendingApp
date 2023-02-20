import mongoose from 'mongoose';
import bartendingCompanySchema from './bartendingCompanyModel.js';

const drinkListSchema = new mongoose.Schema ({
    bartending_company: {
        type: bartendingCompanySchema,
        required: true
    }
});

export default mongoose.models?.DrinkList || mongoose.model('DrinkList', eventSchema)