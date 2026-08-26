const Workout = require('../models/workout');

const home = async (req, res) => {
  if (req.session.user) {
    const workoutCount = await Workout.countDocuments({ owner: req.session.user._id });
    return res.render('index.ejs', { workoutCount });
  }

  res.render('index.ejs');
};

module.exports = {
  home,
};