// index.js
const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const serviceAccount = require('./serviceAccountKey.json'); // Download this from Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

app.get('/', (req, res) => {
  res.send('Sifa Backend is running!');
});

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
