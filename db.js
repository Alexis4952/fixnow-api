const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "", // Άφησέ το κενό γιατί το root δεν έχει κωδικό
    database: "fixnow_db",
    port: 3306 // Βεβαιώσου ότι είναι στη σωστή θύρα
});

connection.connect((err) => {
    if (err) {
        console.error("Database connection failed: " + err.stack);
        return;
    }
    console.log("Connected to MySQL database.");
});

module.exports = connection;
