const express = require("express");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// **Σύνδεση με MySQL**
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed: ", err);
    } else {
        console.log("Connected to MySQL Database");
    }
});

// **Εγγραφή Χρήστη**
app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

    db.query(sql, [name, email, hashedPassword], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Registration failed" });
        }
        res.json({ message: "User registered successfully" });
    });
});

// **Σύνδεση Χρήστη**
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], async (err, results) => {
        if (err || results.length === 0) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const user = results[0];
        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ userId: user.id }, "SECRET_KEY", { expiresIn: "7d" });
        res.json({ token, userId: user.id, email: user.email });
    });
});

// **Προστατευμένη Διαδρομή**
app.get("/protected", (req, res) => {
    const token = req.headers["authorization"];
    if (!token) return res.status(403).json({ message: "Unauthorized" });

    jwt.verify(token, "SECRET_KEY", (err, decoded) => {
        if (err) return res.status(403).json({ message: "Unauthorized" });
        res.json({ message: "Protected content", userId: decoded.userId });
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
