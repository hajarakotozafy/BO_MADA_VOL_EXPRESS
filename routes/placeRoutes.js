const express = require('express');

const { getPlaces, getFreePlace, getFreePlaceNumber, getNotFreePlaceNumber } = require('../controller/PlaceController');

const router = express.Router();

router.get('/', getPlaces);//lister toutes les places
router.get('/notOccuped', getFreePlace);//lister les places libres
router.get('/free/number/:numAvion', getFreePlaceNumber);//récuperer le nombre des places libres par avion
router.get('/not/free/number/:numAvion', getNotFreePlaceNumber);//récuperer le nombre des places occupées par avion

module.exports = router;