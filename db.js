const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",  // Άφησε το κενό αν δεν έχεις βάλει κωδικό
    database: "fixnow_db"
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed: ", err);
        return;
    }
    console.log("Connected to database!");
});

module.exports = db;

