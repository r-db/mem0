// This file centralizes the Firebase configuration and initialization.
const path = require('path');

// This explicitly tells dotenv where to find the .env file.
// It constructs a path from the current file's directory up to the 'backend' folder and then to '.env'.
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });


const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');

// Read the credentials from your .env file
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

// --- Debugging Step ---
// Let's print the configuration to see if all values are loaded correctly.
console.log("--- Firebase Config Being Used ---");
console.log(firebaseConfig);
console.log("---------------------------------");
// --------------------

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
console.log('Firebase connection initialized.');

// Export the database connection so other files can use it
module.exports = { db };
