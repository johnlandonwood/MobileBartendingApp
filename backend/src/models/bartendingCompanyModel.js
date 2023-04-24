import mongoose from 'mongoose';


const bartendingCompanySchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    bartenders: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        }
    ],
    logoUrl: {
        type: String,
        trim: true,
    }
});

export default mongoose.models?.BartendingCompany || mongoose.model('BartendingCompany', bartendingCompanySchema)