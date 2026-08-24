const Workout = require('../models/workout');
const Exercise = require('../models/exercise');

const index = async (req, res) => {
  try {
    const workouts = await Workout.find({ owner: req.session.user._id }).sort({ date: -1 });

    res.render('workouts/index.ejs', {
      workouts: workouts,
    });
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
};

const newWorkout = async (req, res) => {
  res.render('workouts/new.ejs');
};

const create = async (req, res) => {
  try {
    req.body.owner = req.session.user._id;
    const workout = await Workout.create(req.body);

    res.redirect(`/workouts/${workout._id}`);
  } catch (err) {
    console.log(err);
    res.redirect('/workouts');
  }
};

const show = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.workoutId).populate('routines.exercise');

    if (!workout.owner.equals(req.session.user._id)) {
      return res.redirect('/workouts');
    }

    const exercises = await Exercise.find({ owner: req.session.user._id });

    res.render('workouts/show.ejs', {
      workout: workout,
      exercises: exercises,
    });
  } catch (err) {
    console.log(err);
    res.redirect('/workouts');
  }
};

const edit = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.workoutId);

    if (!workout.owner.equals(req.session.user._id)) {
      return res.redirect('/workouts');
    }

    res.render('workouts/edit.ejs', {
      workout: workout,
    });
  } catch (err) {
    console.log(err);
    res.redirect('/workouts');
  }
};

const update = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.workoutId);

    if (!workout.owner.equals(req.session.user._id)) {
      return res.redirect('/workouts');
    }

    workout.title = req.body.title;
    workout.date = req.body.date;
    await workout.save();

    res.redirect(`/workouts/${workout._id}`);
  } catch (err) {
    console.log(err);
    res.redirect('/workouts');
  }
};

const deleteWorkout = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.workoutId);

    if (!workout.owner.equals(req.session.user._id)) {
      return res.redirect('/workouts');
    }

    await workout.deleteOne();

    res.redirect('/workouts');
  } catch (err) {
    console.log(err);
    res.redirect('/workouts');
  }
};

module.exports = {
  index,
  newWorkout,
  create,
  show,
  edit,
  update,
  deleteWorkout,
};
