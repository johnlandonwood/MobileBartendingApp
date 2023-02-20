import mongoose from 'mongoose';
import userSchema from './userModel.js';

const bartendingCompanySchema = new mongoose.Schema ({
    bartending_company_name: {
        type: String,
        required: true
    },
    admin: {
        type: userSchema,
        required: true
    },
    sub_admins: {
        type: [userSchema]
    },
    bartenders: {
        type: [userSchema]
    }
});

export default mongoose.models?.BartendingCompany || mongoose.model('BartendingCompany', bartendingCompanySchema)