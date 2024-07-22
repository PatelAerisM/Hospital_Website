const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "", // Replace with your MySQL password
    database: "hospital"
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// GET all patients
app.get("/", (req, res) => {
    const sql = "SELECT * FROM Patient";
    db.query(sql, (err, data) => {
        if (err) {
            console.error('Error retrieving patients:', err);
            return res.status(500).json({ error: "Error retrieving patients" });
        }
        return res.status(200).json(data);
    });
});

// GET single patient by ID
app.get('/patient/:id', (req, res) => {
    const sql = "SELECT * FROM Patient WHERE ID = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) {
            console.error('Error retrieving patient:', err);
            return res.status(500).json({ error: "Error retrieving patient" });
        }
        if (data.length === 0) {
            return res.status(404).json({ message: "Patient not found" });
        }
        return res.status(200).json(data[0]);
    });
});

// POST create a new patient
app.post('/create', (req, res) => {
    const sql = "INSERT INTO Patient (NAME, Email, Age, Gender, Description, Protocol, Physician, Location, BodyPartExamined, DescriptionOfScan, Date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.age,
        req.body.gender,
        req.body.description,
        req.body.protocol,
        req.body.physician,
        req.body.location,
        req.body.bodyPartExamined,
        req.body.descriptionOfScan,
        req.body.date
    ];
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error creating patient:', err);
            return res.status(500).json({ error: "Error creating patient" });
        }
        console.log('Patient created successfully');
        return res.status(201).json({ message: 'Patient created successfully' });
    });
});

// PUT update a patient by ID
app.put('/update/:id', (req, res) => {
    const sql = "UPDATE Patient SET NAME = ?, Email = ?, Age = ?, Gender = ?, Description = ?, Protocol = ?, Physician = ?, Location = ?, BodyPartExamined = ?, DescriptionOfScan = ?, Date = ? WHERE ID = ?";
    const id = req.params.id;
    const values = [
        req.body.name,
        req.body.email,
        req.body.age,
        req.body.gender,
        req.body.description,
        req.body.protocol,
        req.body.physician,
        req.body.location,
        req.body.bodyPartExamined,
        req.body.descriptionOfScan,
        req.body.date,
        id // ID from URL parameter
    ];
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error updating patient:', err);
            return res.status(500).json({ error: "Error updating patient" });
        }
        console.log('Patient updated successfully');
        return res.status(200).json({ message: 'Patient updated successfully' });
    });
});

// DELETE a patient by ID
app.delete('/patient/:id', (req, res) => {
    const sql = "DELETE FROM Patient WHERE ID = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error deleting patient:', err);
            return res.status(500).json({ error: "Error deleting patient" });
        }
        console.log('Patient deleted successfully');
        return res.status(200).json({ message: 'Patient deleted successfully' });
    });
});

app.listen(8081, () => {
    console.log("Server is running on port 8081");
});
