const express = require('express');

const router = express.Router();

const exerciseCtrl = required('../controllers/exerciseCtrl');

router.get('/', exerciseCtrl.index);
router.get('/', exerciseCtrl.create);
router.get('/:exerciseId', exerciseCtrl.deleteExercise);

module.exports = router;