const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../config/database'); 
const router = express.Router();

// Login Route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }
        
        // Check if the email exists in the database
        db.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            if (result.length === 0) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            // Compare the provided password with the hashed password
            const user = result[0];
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            //  Successful login
            res.status(200).json({ 
                message: 'Login successful', 
                user: {
                    id: user.id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    phone: user.phone,
                    user_type: user.user_type
                }
            });
        });

    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
