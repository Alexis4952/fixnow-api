const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',   // Αν έχεις αλλάξει το user στο MySQL, άλλαξέ το εδώ
    password: '',   // Αν έχεις βάλει password στο MySQL, γράψε το εδώ
    database: 'fixnow_db',  // Σιγουρέψου ότι αυτή είναι η σωστή βάση
    port: 3306  // Αν έχεις αλλάξει port, βάλτο σωστά εδώ
});

connection.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

module.exports = connection;
