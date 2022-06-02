const express = require('express');
const app = express();
const cors = require('cors');
const { errorHandler } = require('./middleware/errorMiddleware');

const avionRoutes = require('./routes/avionRoutes');
const volRoutes = require('./routes/volRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const placeRoutes = require('./routes/placeRoutes');
const BoRoutes = require('./routes/BOComRoutes');

app.use(cors());
app.use(express.json());

app.use('/api/avion', avionRoutes);
app.use('/api/place', placeRoutes);
app.use('/api/vol', volRoutes);
app.use('/api/reservation', reservationRoutes);
app.use('/api/Com', BoRoutes);


app.listen(port, () => console.log(`Server listening on port ${port}... \nLe point d'entrer est: "http://127.0.0.1:3000/api/" suivi du route que vous voulez acceder`))