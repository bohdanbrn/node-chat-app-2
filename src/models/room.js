const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;