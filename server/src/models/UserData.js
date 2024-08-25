const mongoose = require('mongoose');

const userDataSchema = new mongoose.Schema({
    user_id: String,
    email: String,
    roll_number: String,
    numbers: [String],
    alphabets: [String],
    highest_lowercase_alphabet: [String],
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('UserData', userDataSchema);
