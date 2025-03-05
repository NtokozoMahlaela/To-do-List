const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Environment variables
require('dotenv').config();

// MongoDB URI (You can also put it in a `.env` file)
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://ntokozomokoena07:Ntokza084@cluster0.i3htb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const PORT = process.env.PORT || 5000;

// Connect to MongoDB (removed deprecated options)
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected successfully"))
    .catch((err) => console.log("Error connecting to MongoDB:", err));

// Sample route
app.get('/', (req, res) => {
    res.send("Hello World, MongoDB connected!");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


