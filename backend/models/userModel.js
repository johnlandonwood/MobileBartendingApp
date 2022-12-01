const mongoose = require('mongoose');

const userSchema = new mongoose.Schema ({
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    phone_number: String,
    user_type: String,
    date_of_birth: Date
});

module.exports = mongoose.model('User', userSchema);