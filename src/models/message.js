const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    roomID: {
        type: ObjectId,
        required: true
    },
    userID: {
        type: ObjectId,
        required: true
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;