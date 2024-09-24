const express = require('express');
const app = express();
const path = require('path');
const logger = require('morgan');

require('dotenv').config();
require('./config/database');

const userRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const apiRouter=require('./routes/api')
const eventRouter = require('./routes/events');


const cors = require('cors')

// Increase header size limit
// app.use(express.json({ limit: '10kb' })); // adjust the size as needed
// app.use(express.urlencoded({ limit: '10kb', extended: true })); // for URL-encoded data

app.use(cors());
app.use(logger('dev'));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'build')));

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/events', eventRouter);
app.use('/api/api', apiRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.get('/weather/loc', (req, res) => {
  const { lat, lng } = req.query;
  // Logic for handling weather request
  res.json({ lat, lng, weather: 'sunny' });  // Sample response
});

app.get('/api/api/weather/loc/', (req, res) => {
  const lat = req.query.lat;
  const lng = req.query.lng;
  res.json({ message: `Coordinates: ${lat}, ${lng}` });
});

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3001;

app.listen(port, ()=> {
  console.log(`Express is listening on port ${port}.`)
});
