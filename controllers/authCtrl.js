/* eslint-disable no-empty */
/* eslint-disable no-console */
const bcrypt = require('bcrypt');
const User = require('../models/user');
const Exercise = require('../models/exercise');

const SALT_ROUDS = 10;

const signup = async (req, res) => {
  res.render('auth/sign-up.ejs');
};

const register = async (req, res) => {
  try {
    // verify if the username alrady exists
    const userInDatabase = await User.findOne({ username: req.body.username });
    // if the user exists send error msg
    if (userInDatabase) {
      return res.send('Invalid input');
    }
    // else send error msg
    if (req.body.password !== req.body.confirmPassword) {
      return res.send('Invalid input');
    }
    // Encrypt the password
    const hashedPassword = bcrypt.hashSync(req.body.password, SALT_ROUDS);
    req.body.password = hashedPassword;

    // else lets check if the password match
    // if password matches create the new user
    const user = await User.create(req.body);

    // give every new user a starting exercise library
    const starterExercises = [
      { name: 'Bench Press', muscleGroup: 'Chest' },
      { name: 'Push-Up', muscleGroup: 'Chest' },
      { name: 'Squat', muscleGroup: 'Legs' },
      { name: 'Deadlift', muscleGroup: 'Back' },
      { name: 'Overhead Press', muscleGroup: 'Shoulders' },
      { name: 'Pull-Up', muscleGroup: 'Back' },
      { name: 'Bicep Curl', muscleGroup: 'Arms' },
      { name: 'Tricep Extension', muscleGroup: 'Arms' },
      { name: 'Lat Pulldown', muscleGroup: 'Back' },
      { name: 'Leg Press', muscleGroup: 'Legs' },
      { name: 'Lunge', muscleGroup: 'Legs' },
      { name: 'Plank', muscleGroup: 'Core' },
      { name: 'Bent-Over Row', muscleGroup: 'Back' },
      { name: 'Lateral Raise', muscleGroup: 'Shoulders' },
      { name: 'Romanian Deadlift', muscleGroup: 'Legs' },
    ];

    await Exercise.insertMany(
      starterExercises.map((exercise) => ({ ...exercise, owner: user._id }))
    );

    req.session.user = {
      username: user.username,
      _id: user._id,
    };
    // redirect to homepage
    req.session.save(() => {
      res.redirect('/');
    });
  } catch (err) {
    console.log(err);
    res.send('something went wrong');
  }
};

const signin = async (req, res) => {
  res.render('auth/sign-in.ejs');
};

const login = async (req, res) => {
  const userInDatabase = await User.findOne({ username: req.body.username });

  if (!userInDatabase) {
    return res.send('Invalid credentials');
  }

  if (!bcrypt.compareSync(req.body.password, userInDatabase.password)) {
    return res.send('Invalid credentials');
  }

  req.session.user = {
    username: userInDatabase.username,
    _id: userInDatabase._id,
  };

  req.session.save(() => {
    res.redirect('/');
  });
};

const signout = async (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};

module.exports = {
  signup,
  register,
  signin,
  login,
  signout,
};