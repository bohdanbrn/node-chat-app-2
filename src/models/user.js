const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        trim: true
    },
    registerDate: {
        type: Date,
        default: Date.now
    },
    // online or offline
    status: {
        type: Boolean,
        default: false
    },
    // ids of user active rooms
    activeRooms: {
        type: Array,
        default: []
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;