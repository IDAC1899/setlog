const mongoose = require('mongoose');
const Exercise = require('./exercise');

const routineSchema = new mongoose.Schema({
    exercise: {
        type: mongoose.Schema.Types.ObjectId,
        red: 'Exercise',
        required: true,
    },

    sets: {
        type: Number,
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    routines: [routineSchema],
});

const Workout = mongoose.model('Workout', workoutSchema);       

module.exports = Workout;