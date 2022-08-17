const connection = require('./connection');

const getReservation = (req, res) => {
    console.warn({METHOD: 'GET', ROUTE:'reservation'});
    connection.query('SELECT * FROM reservation WHERE status = 0 order BY numReservation DESC', (err, rows) => {
        if (err) {
            throw err
        } else {
            res.status(200).send(rows);
        }
    });

};

const addReservation = (req, res) => {
    //validation des données
    connection.query("INSERT INTO reservation (numVol, numAvion, numPlace, dateReservation, nomVoyageur, status) VALUES (?,(SELECT numAvion FROM avion WHERE numVol = ?),?,NOW(),?,0)",
        [req.body.numVol, req.body.numVol, req.body.numPlace, req.body.nomVoyageur],
        (err, rows) => {
            if (err) throw err
            else {
                connection.query("UPDATE place SET Occupation = 1 WHERE numAvion = (SELECT numAvion FROM avion WHERE numVol = ?) AND numPlace = ?",
                    [req.body.numVol, req.body.numPlace],
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
    cancelReservation,
    getReservation
}