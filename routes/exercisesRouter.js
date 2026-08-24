const express = require('express');

const router = express.Router();

const exerciseCtrl = require('../controllers/exerciseCtrl');

router.get('/', exerciseCtrl.index);
router.get('/', exerciseCtrl.create);
router.post('/', exerciseCtrl.create);
router.delete('/:exerciseId', exerciseCtrl.deleteExercise);

module.exports = router;