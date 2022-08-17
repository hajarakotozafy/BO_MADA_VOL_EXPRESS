const express = require('express');
const { validateAvion } = require('../controller/objectValidator');

const { getAvion, getSpecificAvion, addAvion, deleteAvion, putAvion } = require('../controller/AvionController');

const router = express.Router();

router.route('/').get(getAvion).post(addAvion);

router.route('/:id').get(getSpecificAvion).put(putAvion).delete(deleteAvion);

module.exports = router;