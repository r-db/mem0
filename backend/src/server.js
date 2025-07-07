const express = require('express');
const cors = require('cors'); // <-- 1. Import the cors package
const app = express();
const PORT = process.env.PORT || 3001;

const leadsRoute = require('./api/leads');
const chatRoute = require('./api/chat');

// --- Middleware ---
app.use(cors()); // <-- 2. Tell the app to use the cors middleware
app.use(express.json());


// --- API Routes ---
app.use('/api/leads', leadsRoute);
app.use('/api/chat', chatRoute);


app.get('/', (req, res) => {
  res.send('Backend server for mimzero.com is running.');
});


// --- Server Startup ---
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
