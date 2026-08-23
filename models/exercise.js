const mongoose = require('mongoose');

const execersizeShcema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    muscleGroup: {
        type: String,
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const Exercise = mongoose.model('Exercise', execersizeShcema);

module.exports = Exercise;