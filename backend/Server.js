// Install dependencies: npm install express json-server cors
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const dbFilePath = "db.json";

// Read database file
function readDB() {
    return JSON.parse(fs.readFileSync(dbFilePath, "utf-8"));
}

// Write to database file
function writeDB(data) {
    fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));
}

// Get all tasks
app.get("/tasks", (req, res) => {
    const db = readDB();
    res.json(db.tasks);
});

// Add a new task
app.post("/tasks", (req, res) => {
    const db = readDB();
    const newTask = { id: Date.now(), ...req.body };
    db.tasks.push(newTask);
    writeDB(db);
    res.json(newTask);
});

// Update a task
app.put("/tasks/:id", (req, res) => {
    const db = readDB();
    const taskIndex = db.tasks.findIndex(t => t.id == req.params.id);
    if (taskIndex === -1) return res.status(404).send("Task not found");
    db.tasks[taskIndex] = { ...db.tasks[taskIndex], ...req.body };
    writeDB(db);
    res.json(db.tasks[taskIndex]);
});

// Delete a task
app.delete("/tasks/:id", (req, res) => {
    const db = readDB();
    db.tasks = db.tasks.filter(t => t.id != req.params.id);
    writeDB(db);
    res.send("Task deleted");
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
