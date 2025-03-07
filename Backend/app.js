const express = require('express');
const cors = require('cors');
const app = express();
const signupRoutes = require('./routes/signup'); 
const loginRoutes = require('./routes/login');

// Middleware
app.use(cors()); // Allows frontend to connect
app.use(express.json()); // Parses incoming JSON data

// Routes
app.use('/signup', signupRoutes);
app.use('/login', loginRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
