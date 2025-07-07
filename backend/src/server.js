const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

// Import our API routes
const leadsRoute = require('./api/leads');
const chatRoute = require('./api/chat'); // <-- New chat route import

app.use(express.json());

// --- API Routes ---

// Use the leadsRoute for any request that starts with "/api/leads"
app.use('/api/leads', leadsRoute);

// Use the chatRoute for any request that starts with "/api/chat"
app.use('/api/chat', chatRoute); // <-- New chat route registration


// This is our basic test route
app.get('/', (req, res) => {
  res.send('Backend server for mimzero.com is running.');
});


// --- Server Startup ---
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
