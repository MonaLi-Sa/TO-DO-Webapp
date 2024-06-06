// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize the app
const app = express();

// Middleware to parse JSON bodies
app.use(cors());
app.use(bodyParser.json());

// Import routes
const todoRoutes = require('./routes/todos');

// Use routes
app.use('/api/todos', todoRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
