const connection = require('./connection.js')

const getPlaces = (req, res) => {
    connection.query("SELECT * FROM place",
        (err, rows) => {
            if (err) throw err
            else res.status(200).send(rows)
        })
}

const getFreePlace = (req, res) => {
    connection.query("SELECT * FROM place WHERE Occupation = 0",
        (err, rows) => {
            if (err) throw err
            else res.status(200).send(rows)
        })
}

// const unfreePlace = (req, res) => {
//     connection.query("UPDATE place SET Occupation = 1 WHERE numAvion = ? numPlace = ?",
//         [req.body.numAvion, req.body.numPlace],
//         (err, rows) => {
//             if (err) throw err
//             else {
//                 res.status(200).send(rows)
//             }
//         })
// }

// const freePlace = (req, res) => {
//     connection.query("UPDATE place SET Occupation = 0 WHERE numAvion = ? numPlace",
//         [req.body.numAvion, req.body.numPlace],
//         (err, rows) => {
//             if (err) throw err
//             else {
//                 res.status(200).send(rows)
//             }
//         })
// }

const getFreePlaceNumber = (req, res) => {
    connection.query("SELECT COUNT(numPlace) as numbreDePlaceLibre FROM place WHERE numAvion = ? AND Occupation = 0",
        [req.params.numAvion],
        (err, rows) => {
            if (err) throw err
            else res.status(200).send(rows)
        })
}

const getNotFreePlaceNumber = (req, res) => {
    connection.query("SELECT COUNT(numPlace) as numbreDePlaceOccupee FROM place WHERE numAvion = ? AND Occupation = 1",
        [req.params.numAvion],
        (err, rows) => {
            if (err) throw err
            else res.status(200).send(rows)
        })
}

module.exports = {
    getPlaces,
    getFreePlace,
    // unfreePlace,
    // freePlace,
    getFreePlaceNumber,
    getNotFreePlaceNumber
}