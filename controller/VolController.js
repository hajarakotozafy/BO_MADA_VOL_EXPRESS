const connection = require('./connection');

const getVol = (req, res) => {
    connection.query(`SELECT * FROM vol`, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
            console.log("affichage des vols");
        }
    })
}

const getSpecificVol = (req, res) => {
    connection.query(`SELECT * FROM vol WHERE numVol = ?`, [req.params.id], (err, result) => {
        if (err) {
            throw err
        } else {
            res.send(result);
            console.log("affichage d'un vol spécifique")
        }
    })
}

const addVol = (req, res) => {

    //Validation des données

    /** toutes les valeurs contenues dans req.body sont requises dont villeDepart
    * villeArrivee, heureDepart, frais et numAvion
    **/

    /**
     * tsy tokony hitovy heureDepart ny vol de même trajectoire
     */

    connection.query(`INSERT INTO vol (villeDepart, villeArrivee, heureDepart, frais) VALUES (?,?,?,?)`,
        [req.body.villeDepart, req.body.villeArrivee, req.body.heureDepart, req.body.frais],
        (err, result) => {
            if (err) throw err
            else {
                connection.query("SELECT numVol FROM vol WHERE villeDepart = ? AND villeArrivee = ? AND heureDepart = ? AND frais = ?",
                    [req.body.villeDepart, req.body.villeArrivee, req.body.heureDepart, req.body.frais],
                    (err, rows) => {
                        if (err) throw err
                        else {
                            connection.query("UPDATE avion SET numVol = ? WHERE numAvion = ?",
                                [rows[0].numVol, req.body.numAvion],
                                (err, resultat) => {
                                    res.status(200).send(resultat)
                                    console.log("Ajout de vol avec succès")
                                })
                        }
                    })
            }
        });
}

const deleteVol = (req, res) => {
    connection.query(`SELECT * FROM vol WHERE numVol = ?`,
        [req.params.id],
        (err, result) => {
            if (err) throw err
            else if (!result[0]) return res.status(404).send("ce vol n'existe pas")
            else {
                connection.query(`DELETE FROM vol WHERE numVol = ?`,
                    [req.params.id],
                    (err, rows) => {
                        if (err) throw err
                        else {
                            connection.query("UPDATE avion SET numVol = 0 WHERE numVol = ?",
                                [req.params.id],
                                (err, rows) => {
                                    if (err) throw err
                                    else {
                                        res.status(200).send(rows);
                                        console.log("Suppression éffectuée avec succès")
                                    }
                                })

                        }
                    })
            }
        })
}

const putVol = (req, res) => {
    connection.query("SELECT * FROM vol WHERE numVol = ?",
        [req.params.id],
        (err, result) => {
            if (err) throw err
            else if (!result[0]) res.status(404).send("vol not found")
            else {

                //Validation des données

                connection.query("UPDATE vol SET villeDepart = ?, villeArrivee = ?, heureDepart = ?, frais = ?",
                    [req.body.villeDepart, req.body.villeArrivee, req.body.heureDepart, req.body.frais],
                    (err, rows) => {
                        if (err) throw err
                        else {
                            res.status(200).send(rows)
                            console.log("Modification éffectuée avec succès")
                        }
                    })
            }
        })
}

module.exports = {
    getVol,
    getSpecificVol,
    addVol,
    deleteVol,
    putVol
}