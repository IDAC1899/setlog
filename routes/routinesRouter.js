const express = require('express');

const router = express.Router({ mergeParams: true });

const routineCtrl = require('../controllers/routineCtrl');

router.post('/', routineCtrl.create);
router.delete('/:routineId', routineCtrl.deleteRoutine);

module.exports = router;