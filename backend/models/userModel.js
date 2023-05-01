import mongoose from 'mongoose';
import emailValidator from 'email-validator';
import bcrypt from 'bcrypt';


const userSchema = new mongoose.Schema ({
    firstName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true,
        validate: {
            validator: emailValidator.validate,
            message: props => `${props.value} is not a valid email address.`
        }
    },
    phone: {
        type: String,
        unique: true,
        trim: true
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'company_owner', 'bartender', 'user']
    },
    dob: {
        type: Date,
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BartendingCompany'
    },
    password: {
        type: String,
        minlength: 8
    },
    provider: {
        type: String,
        required: true,
        enum: ['local', 'google']
    },
    google: {
        id: String,
        picture: String,
    },
});


userSchema.methods.hashPassword = async function(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

// Add this pre-save hook to hash the password before saving
userSchema.pre('save', async function(next) {
    if (this.provider === 'local' && this.isModified('password')) {
        this.password = await this.hashPassword(this.password);
    }
    next();
});



export default mongoose.models?.User || mongoose.model('User', userSchema)
