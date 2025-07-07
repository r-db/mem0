const express = require('express');
const cors = require('cors');

// We no longer need to initialize firebase here.
// Our other modules will import the database connection directly 
// from the new config/firebase.js file.

const app = express();
const PORT = process.env.PORT || 3001;

// Import our API routes
const leadsRoute = require('./api/leads');
const chatRoute = require('./api/chat');

app.use(cors());
app.use(express.json());

// Register the API routes
app.use('/api/leads', leadsRoute);
app.use('/api/chat', chatRoute);

// A simple test route for the root URL
app.get('/', (req, res) => {
  res.send('Backend server for mimzero.com is running.');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
