const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Αν δεν έχεις κωδικό βάλε κενό string
  database: 'fixnow_db',
  port: 3306
});

connection.connect(err => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to the database!');
});

module.exports = connection;
