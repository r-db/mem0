require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');

// --- Firebase Configuration ---
// This reads the credentials from your .env file
const firebaseConfig = {
  apiKey: "AIzaSyALcJOG3SLxIHRz0CyInckuxCJC-nKDmkA",
  authDomain: "mim0-backend.firebaseapp.com",
  projectId: "mim0-backend",
  storageBucket: "mim0-backend.firebasestorage.app",
  messagingSenderId: "423662442881",
  appId: "1:423662442881:web:98ea4e7ebe01ea499e7080"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
console.log('Firebase connection initialized.');
// -----------------------------


const app = express();
const PORT = process.env.PORT || 3001;

const leadsRoute = require('./api/leads');
const chatRoute = require('./api/chat');

app.use(cors());
app.use(express.json());

app.use('/api/leads', leadsRoute);
app.use('/api/chat', chatRoute);

app.get('/', (req, res) => {
  res.send('Backend server for mimzero.com is running.');
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// Export the database connection so our other files can use it
module.exports = { db };
