const mongoose = require('mongoose');
const Exercise = require('./exercise');

const routineShcema = new mongoose.Schema({
    exercise: {
        type: mongoose.Shcema.Types.ObjectId,
        red: 'Exercise',
        required: true,
    },

    reps: {
        type: Number,
        required: true,
    },

    weight: {
        type: Number,
        required: true,
    },
});


const workoutSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    date: {
        type: Date,
        required: true,
    },

    owner: {
        type: mongoose.Shcema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    routines: [routineSchema],
});

const Workout = mongoose.model('Workout', workoutSchema);       

module.exports = Workout;