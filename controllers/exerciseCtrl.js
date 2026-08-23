const Exercise = require('../models/exercise');

const index = async (req, res) => {
    try {
        const exercises = await Exercise.find({ owner: req.session.user._id});

        res.render('exercises/index.ejs', {
            exercises: exercises,
        });
    } catch (err) {
        console.log(err);
        res.redirect('/');
    }
};

const create = async (req, res) => {
    try {
        req.body.owner = req.session.user._id;
        await Exercise.create(req.body);

        res.redirect('/exercises');
    } catch (err) {
        console.log(err);
        res.redirect('/');
    }
};
        
const deleteExercise = async (req, res) => {
    try {
        const exercise = await Exercise.findById(req.params.exerciseId);

        if (!exercise.owner.equals(req.session.user._id)) {
            return res.redirect('/exercises');
        }
        await exercise.deleteOne();

        res.redirect('/exercises');
    } catch (err) {
        console.log(err);
        res.redirect('/');
    }
};

module.exports = {
    index,
    create,
    deleteExercise,
};