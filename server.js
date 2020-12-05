const express = require('express');
var bodyParser = require('body-parser');
const app = express();
const server = require('http').Server(app);
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Define Routes
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.use('/api/upload', require('./routes/api/upload'));
app.use('/api/download', require('./routes/api/download'));

app.get('/', (req, res) => res.send('API running'));
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
