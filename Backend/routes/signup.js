const express = require('express');
const router = express.Router();
const db = require('../config/database'); 
const Joi = require('joi');
const bcrypt = require('bcrypt');

const saltRounds = 10;

 
const userSchema = Joi.object({
    firstname: Joi.string().pattern(/^[a-zA-Z\s]+$/).min(3).max(30).required(),
    lastname: Joi.string().pattern(/^[a-zA-Z\s]+$/).min(3).max(30).required(),
    email: Joi.string().lowercase().email().required(),
    phone: Joi.string().pattern(/^\d{10}$/).required(),
    password: Joi.string().min(6).pattern(/^(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{6,}$/).required(),
    address: Joi.string().optional(),
    user_type: Joi.string().valid('customer', 'admin').default('customer')
});

// Signup Route
router.post('/signup', (req, res) => {
    console.log('Received Request:', req.body);

    //  Validate input 
    const { error } = userSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

//  Extract user data from request
    const { firstname, lastname, email, phone, password, address, user_type } = req.body;

//  Check email or phone already exist 
    db.query('SELECT * FROM users WHERE email = ? OR phone = ?', [email, phone], (err, result) => {
        if (err) {
            console.error('MySQL Error:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        if (result.length > 0) {
            return res.status(409).json({ error: 'Email or phone already exists' });
        }

        //  Hash password
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
                console.error('Hashing Error:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }

            // Insertion data into database
            db.query(
                'INSERT INTO users (firstname, lastname, email, phone, password, address, user_type) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [firstname, lastname, email, phone, hash, address, user_type],
                (err, results) => {
                    if (err) {
                        console.error('MySQL Error:', err);
                        return res.status(500).json({ error: 'Database insert error' });
                    }
                    res.status(201).json({ user_id: results.insertId, email: email, message: 'Signup successful' });
                }
            );
        });
    });
});

module.exports = router;
