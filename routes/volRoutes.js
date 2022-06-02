const express = require('express');

const { getVol, getSpecificVol, addVol, deleteVol, putVol } = require('../controller/VolController');

const router = express.Router();

router.route('/').get(getVol).post(addVol);
router.route('/:id').get(getSpecificVol).put(putVol).delete(deleteVol);

module.exports = router;