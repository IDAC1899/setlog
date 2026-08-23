const express = require('express');

const router = express.Router();

const workoutCtrl = require('../controllers/workoutCtrl');

router.get('/', workoutCtrl.index);
router.get('/new', workoutCtrl.newWorkout);
router.post('/', workoutCtrl.create);
router.get('/:workoutId', workoutCtrl.show);

module.exports = router;