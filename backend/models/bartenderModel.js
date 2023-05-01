import mongoose from 'mongoose';
import emailValidator from 'email-validator';
import bcrypt from 'bcrypt';

// import bartendingcompany from './bartendingCompanyModel.js';

const SALT_WORK_FACTOR = 10;

const bartender = new mongoose.Schema ({
    first_name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    last_name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        // required: true,
        lowercase: true,
        trim: true,
        unique: true,
        validate: {
            validator: emailValidator.validate,
            message: props => `${props.value} is not a valid email address.`
        }
    },
    phone_number: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 8
    },
    // user_type: {
    //     type: String,
    //     lowercase: true,
    //     enum: ["admin", "bartender", "guest"],
    //     required: [true, "Specify user role"]
    // },
    date_of_birth: {
        type: String
    },
    // bartending_company: {
    //     type: bartendingcompany
    // }
});
 bartender.pre('save', async function preSave(next) {
    var bartender = this;

    //only hash the password if it has been modified (or is new)
    if(!bartender.isModified('password')) return next();

    //generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        //hash password using our new salt
        bcrypt.hash(bartender.password, salt, function(err, hash) {
            if(err) return next(err);

            //override cleartext password with hashed one
            bartender.password = hash;
            next();
        });
    });
});
 bartender.methods.comparePassword = async function comparePassword(candidatePassword, cb) {
    return bcrypt.compare(candidate, this.password);
};

export default bartender;