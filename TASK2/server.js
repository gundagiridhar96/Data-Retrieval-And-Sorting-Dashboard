const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Connect to Task 2 database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1100', // <-- replace with your MySQL password
    database: 'task2_db',
    port: 3306
});

db.connect(err => {
    if (err) {
        console.log("Database connection failed:", err);
    } else {
        console.log("Connected to MySQL");
    }
});

// ------------------- GET employees -------------------
app.get('/employees', (req, res) => {
    let { sortBy, filterDept } = req.query;

    let sql = "SELECT * FROM employees";
    let conditions = [];
    let order = "";

    if (filterDept && filterDept !== "All") {
        conditions.push(`department='${filterDept}'`);
    }

    if (conditions.length > 0) sql += " WHERE " + conditions.join(" AND ");

    if (sortBy === "name") order = " ORDER BY name ASC";
    else if (sortBy === "dob") order = " ORDER BY dob ASC";

    sql += order;

    db.query(sql, (err, result) => {
        if (err) return res.status(500).send("Database Error");
        res.json(result);
    });
});

// ------------------- Department count -------------------
app.get('/department-count', (req, res) => {
    const sql = "SELECT department, COUNT(*) AS count FROM employees GROUP BY department";
    db.query(sql, (err, result) => {
        if (err) return res.status(500).send("Database Error");
        res.json(result);
    });
});

app.listen(3001, () => {
    console.log("Task 2 Dashboard running at http://localhost:3001");
});
