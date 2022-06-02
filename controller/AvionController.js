const connection = require('./connection');
const asyncHandler = require('express-async-handler');

// @desc    Get Avions
// @route   GET /api/avion
// @access  Private
const getAvion = asyncHandler(async (req, res) => {
    const result = await connection.query('SELECT * FROM avion', (err, rows) => {
        if (err) {
            throw err
        } else {
            return rows;
        }
    });
    res.status(200).json(result);
});

// @desc    Get Specific Avion
// @route   GET /api/avion/:id
// @access  Private
const getSpecificAvion = (req, res) => {
    if (req.params.id) {
        let id = parseInt(req.params.id);
        connection.query(`SELECT * FROM avion WHERE numAvion = ${id}`,
            (err, row) => {
                if (err) {
                    throw err;
                } else {
                    res.status(200).send(row);
                }
            })
    }
}

// @desc    Set Avion
// @route   POST /api/avion
// @access  Private
const addAvion = (req, res) => {
    connection.query(`INSERT INTO avion (designation, nbPlaces, numVol) VALUES (?,?,?)`,
        [req.body.designation, req.body.nbPlaces, 0],
        (err, result) => {
            if (err) {
                throw err;
            } else {
                const nbPlaces = parseInt(req.body.nbPlaces)
                let numAvion = 0
                if (nbPlaces > 0) {
                    connection.query("SELECT * FROM avion WHERE designation = ?",
                        [req.body.designation],
                        (err, result) => {
                            if (err) throw err
                            else {
                                numAvion = result[0].numAvion
                                let i = 0
                                while (i < nbPlaces) {
                                    connection.query("INSERT INTO place (numAvion,numPlace,Occupation) VALUES (?,?,?)",
                                        [numAvion, i + 1, 0],
                                        (err, rows) => {
                                            if (err) throw err
                                        })

                                    i++
                                }
                            }
                        })
                }
                res.status(201).send(result);
                console.log("avion ajouté avec succès!")
            }
        })
}

// @desc    DELETE Avion
// @route   DELETE /api/avion/:id
// @access  Private
const deleteAvion = (req, res) => {
    connection.query("SELECT * FROM avion WHERE numAvion = ?",
        [req.params.id],
        (err, result) => {
            if (err) throw err
            else if (!result[0]) return res.status(404).send("avion not found")
            else {
                connection.query('DELETE FROM avion WHERE numAvion = ?',
                    [req.params.id],
                    (err, rows) => {
                        if (err) {
                            throw err;
                        } else {
                            connection.query('DELETE FROM place WHERE numAvion = ?',
                                [req.params.id],
                                (err, rows) => {
                                    res.status(200).send(rows);
                                    console.log("avion supprimé avec succès")
                                })

                        }
                    })
            }
        })

}

// @desc    Put Avion
// @route   PUT /api/avion/:id
// @access  Private
const putAvion = (req, res) => {
    connection.query("SELECT * FROM avion WHERE numAvion = ?",
        [req.params.id],
        (err, result) => {
            if (err) throw err
            else if (!result[0]) return res.status(404).send("avion not found");
            else {
                connection.query("UPDATE avion SET designation = ?, nbPlaces = ? , numVol = ? WHERE numAvion = ?",
                    [req.body.designation, req.body.nbPlaces, req.body.numVol, req.params.id],
                    (err, rows) => {
                        if (err) {
                            throw err;
                        } else {
                            res.status(200).send(rows);
                            console.log("avion modifié avec succès");
                        }
                    })
            }
        })

}


module.exports = {
    getAvion,
    getSpecificAvion,
    addAvion,
    deleteAvion,
    putAvion
}