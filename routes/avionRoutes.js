const express = require('express');
const { validateAvion } = require('../controller/objectValidator');

const { getAvion, getSpecificAvion, addAvion, deleteAvion, putAvion } = require('../controller/AvionController');

const router = express.Router();

router.route('/').get(getAvion).post((req, res) => {
    const { error } = validateAvion(req.body);
    if (error) return res.status(400).send(error);

    addAvion(req, res);
});

router.route('/:id').get(getSpecificAvion).put((req, res) => {
    const { error } = validateAvion(req.body);
    if (error) return res.status(400).send(error);

    putAvion(req, res)
}).delete(deleteAvion);

module.exports = router;