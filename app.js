const express = require('express');
const app = express();
const cors = require('cors');

const avionRoutes = require('./routes/avionRoutes');
const volRoutes = require('./routes/volRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const placeRoutes = require('./routes/placeRoutes');
const BoRoutes = require('./routes/BOComRoutes');
const { login } = require('./middleware/auth');

app.use(cors());
app.use(express.json());

app.post('/api/login', (req, res) => {
    login(req, res);
});

app.use('/api/avion', avionRoutes);
app.use('/api/place', placeRoutes);
app.use('/api/vol', volRoutes);
app.use('/api/reservation', reservationRoutes);
app.use('/api/Com', BoRoutes);


app.listen(3001, () => console.log(`Server listening on port 3001... \nLe point d'entrer est: "http://127.0.0.1:3001/api/" suivi du route que vous voulez acceder`))