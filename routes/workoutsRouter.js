const express = require('express');

const router = express.Router();

const workoutCtrl = require('../controllers/workoutCtrl');

router.get('/', workoutCtrl.index);
router.get('/new', workoutCtrl.newWorkout);
router.post('/', workoutCtrl.create);
router.post('/from-template', workoutCtrl.createFromTemplate);
router.get('/:workoutId', workoutCtrl.show);
router.get('/:workoutId/edit', workoutCtrl.edit);
router.put('/:workoutId', workoutCtrl.update);
router.delete('/:workoutId', workoutCtrl.deleteWorkout);


module.exports = router;