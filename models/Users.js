const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create the schema/Model
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
});

module.exports = User = mongoose.model('users', UserSchema);