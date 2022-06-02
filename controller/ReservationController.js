const connection = require('./connection');

const addReservation = (req, res) => {
    //validation des données
    connection.query("INSERT INTO reservation (numVol, numAvion, numPlace, dateReservation, nomVoyageur, status) VALUES (?,?,?,NOW(),?,0)",
        [req.body.numVol, req.body.numAvion, req.body.numPlace, req.body.nomVoyageur],
        (err, rows) => {
            if (err) throw err
            else {
                connection.query("UPDATE place SET Occupation = 1 WHERE numAvion = ? AND numPlace = ?",
                    [req.body.numAvion, req.body.numPlace],
                    (err, result) => {
                        if (err) throw err
                        else {
                            res.status(200).send(rows)
                        }
                    })
            }
        })
}

const cancelReservation = (req, res) => {
    connection.query("UPDATE reservation SET status = 1 WHERE numReservation = ?",
        [req.params.id],
        (err, result) => {
            if (err) throw err
            else {
                connection.query("SELECT numAvion, numPlace FROM reservation WHERE numReservation = ?",
                    [req.params.id],
                    (error, rows) => {
                        if (error) throw error
                        else {
                            connection.query("UPDATE place SET Occupation = 0 WHERE numAvion = ? AND numPlace = ?",
                                [rows[0].numAvion, rows[0].numPlace],
                                (erreur, resultat) => {
                                    if (erreur) throw erreur
                                    else res.status(200).send(resultat);
                                })
                        }
                    })
            }
        })
}



module.exports = {
    addReservation,
    cancelReservation
}