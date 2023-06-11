// server.js

const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const routes = require('./routes');

const app = express();

// Middleware untuk menguraikan data JSON dalam permintaan
app.use(express.json());

// Konfigurasi admin SDK Firebase
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Middleware untuk body parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Gunakan rute yang telah diatur pada aplikasi Express
app.use('/', routes);

// Menjalankan server pada port 3000
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
