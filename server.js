const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Log MongoDB URI for debugging
console.log('MongoDB URI:', process.env.MONGO_URI);

// Enable CORS
app.use(cors());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection
const uri = process.env.MONGO_URI;
const dbName = 'todoApp'; // Replace with your database name
let db;
let tasksCollection;


// Start the server only after MongoDB connection is established
async function startServer() {
    try {
      await connectToDatabase(); // Wait for MongoDB connection
      app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
      });
    } catch (error) {
      console.error('❌ Failed to start server:', error);
    }
  }
// Function to connect to MongoDB
async function connectToDatabase() {
  try {
    const client = await MongoClient.connect(uri);
    console.log('✅ Database connected successfully!');
    db = client.db(dbName);
    tasksCollection = db.collection('tasks');
    return client; // Return the client for further use
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process if MongoDB connection fails
  }
}

// Start the application
startServer();

// Sample route
app.get('/', (req, res) => {
  res.send('Hello World, MongoDB connected!');
});