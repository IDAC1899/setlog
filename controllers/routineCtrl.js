const Workout = require('../models/workout');

const create = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.workoutId);

    if (!workout.owner.equals(req.session.user._id)) {
      return res.redirect('/workouts');
    }

    workout.routines.push(req.body);
    await workout.save();

    res.redirect(`/workouts/${workout._id}`);
  } catch (err) {
    console.log(err);
    res.redirect('/workouts');
  }
};

const deleteRoutine = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.workoutId);

    if (!workout.owner.equals(req.session.user._id)) {
      return res.redirect('/workouts');
    }

    workout.routines.id(req.params.routineId).deleteOne();
    await workout.save();

    res.redirect(`/workouts/${workout._id}`);
  } catch (err) {
    console.log(err);
    res.redirect('/workouts');
  }
};

module.exports = {
  create,
  deleteRoutine,
};