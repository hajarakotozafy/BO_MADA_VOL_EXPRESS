const connection = require('./connection')

const getVoyageur = (req, res) => {
    connection.query("SELECT reservation.nomVoyageur as nomVoyageur, avion.designation as designation, reservation.numPlace as numPlace, vol.villeDepart as villeDepart, vol.villeArrivee as villeArrivee, vol.heureDepart as horaireDepart , vol.frais as montant FROM avion, reservation, vol WHERE avion.numAvion = reservation.numAvion AND vol.numVol = avion.numVol",
        (err, rows) => {
            if (err) throw err
            else res.status(200).send(rows);
        })
}

const recetteParMois = (req, res) => {
    connection.query("SELECT numAvion")
}

module.exports = {
    getVoyageur
}