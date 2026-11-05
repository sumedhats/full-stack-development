
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Middleware
app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

// Sample student data
let students = [
    { id: 1, name: "Rahul" },
    { id: 2, name: "Priya" }
];

// READ - Get all students
app.get("/students", (req, res) => {
    res.json(students);
});

// CREATE - Add student
app.post("/students", (req, res) => {
    const student = {
        id: Date.now(),
        name: req.body.name
    };

    if (!student.name || !student.name.trim()) {
        return res.status(400).json({
            message: "Student name is required"
        });
    }

    students.push(student);
    res.status(201).json(student);
});

// UPDATE - Update student
app.put("/students/:id", (req, res) => {
    const id = Number(req.params.id);
    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    student.name = req.body.name;
    res.json(student);
});

// DELETE - Delete student
app.delete("/students/:id", (req, res) => {
    const id = Number(req.params.id);
    students = students.filter(s => s.id !== id);

    res.json({
        message: "Student deleted successfully"
    });
});

// Start server
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});

