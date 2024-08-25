const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const cors = require('cors');

const app = express();
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());


app.use('/bfhl', apiRoutes);

//error handler
app.use((err, req, res, next) => {
  res.status(500).json({ is_success: false, message: err.message });
});

module.exports = app;
