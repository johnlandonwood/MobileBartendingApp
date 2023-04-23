import mongoose from 'mongoose';

const bartendingCompanySchema = new mongoose.Schema ({
    bartending_company_name: {
        type: String,
        required: true
    },
    // admin: {
    //     type: user,
    //     required: true
    // },
    // sub_admins: {
    //     type: [user]
    // },
    // bartenders: {
    //     type: [user]
    // }
});

const bartendingCompanyModel = mongoose.model('BartendingCompany', bartendingCompanySchema);

export const schema = bartendingCompanyModel.schema;

export default bartendingCompanyModel;