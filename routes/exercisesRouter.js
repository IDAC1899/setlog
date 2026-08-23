const express = require('express');

const router = express.Router();

const exerciseCtrl = require('../controllers/exerciseCtrl');

router.get('/', exerciseCtrl.index);
router.get('/', exerciseCtrl.create);
router.get('/:exerciseId', exerciseCtrl.deleteExercise);

module.exports = router;