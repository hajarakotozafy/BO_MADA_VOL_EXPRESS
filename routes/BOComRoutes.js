const express = require('express');

const { getVoyageur } = require('../controller/BoComController');

const router = express.Router();

router.get('/voyageur/all', getVoyageur);//lister tous les voyageurs enregistrés

module.exports = router;