const jwt = require('jsonwebtoken');

require('dotenv').config();

const user = { id: 45, pseudo: 'HajaRakotozafy', email: 'nyaina@gmail.com', admin: true };

const generateAccessToken = user => jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1800s' });
const generateRefreshToken = user => jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1y' });

const login = (req, res) => {
    if (req.body.username !== user.pseudo) {
        res.status(400).send("invalid credentials");
        return;
    }
    if (req.body.password !== "enjana") {
        res.status(400).send("invalid credentials");
        return;
    }
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    res.send(user);
}

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ 'err': 'on a besoin de token' });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(401).json({ 'err': 'erreur dans le token' });
        }
        req.user = user;
        next();
    })
}

const refreshToken = (req, res) => {
    // const authHeader = req.headers['authorization'];
    const authHeader = req.body.refresh;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json('pas de refresh')
    }

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(401).json({ 'err': 'erreur dans refresh token' });
        }
        delete user.iat;
        delete user.exp;
        const refreshedToken = generateAccessToken(user);
        console.log('Je renvoie un nouvel token')
        res.send({
            accessToken: refreshedToken
        })
    })
}

module.exports = {
    login,
    refreshToken,
    authenticateToken
}