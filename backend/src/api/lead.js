const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

// Import the new leads route
const leadsRoute = require('./api/leads');

app.use(express.json());

// --- API Routes ---

// Tell the app to use the leadsRoute for any request that starts with "/api/leads"
app.use('/api/leads', leadsRoute);


// This is our basic test route
app.get('/', (req, res) => {
  res.send('Backend server for mimzero.com is running.');
});


// --- Server Startup ---
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
