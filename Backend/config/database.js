const mysql = require('mysql');

// MySQL connection 
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mwQg67XN',  
    database: 'LadiesShopee'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database: ', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// connection to be used by other files
module.exports = db;
