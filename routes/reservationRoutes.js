const express = require('express');

const { addReservation, cancelReservation, getReservation } = require('../controller/ReservationController');

const router = express.Router();

//routes pour les résérvations de place
router.post('/add', addReservation);//ajouter une reservation {"numAvion": , "numPlace": , "dateReservation": "", "nomVoyageur": "", "status": (0:en cours, 1:annulée)}
router.delete('/cancel/:id', cancelReservation);//annuler la résérvation numero "id"
router.get('/', getReservation);
module.exports = router;