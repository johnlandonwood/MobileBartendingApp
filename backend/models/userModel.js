const mongoose = require('mongoose');

const userSchema = new mongoose.Schema ({
    first_name: String,
    last_name: String,
    email: String,
    phone_number: Number,
    password: String,
    user_type: String,
    date_of_birth: Date
});

module.exports = mongoose.model('User', userSchema);