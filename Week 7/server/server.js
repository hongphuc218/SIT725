const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = 3000;
const http = require('http');
const server = http.createServer(app);
const path = require("path");
const { Server } = require("socket.io");
const io = new Server(server);

// Middleware
app.use(cors());
app.use(express.json());

// Static File Sharing
app.use(express.static(path.join(__dirname, "../public")));

// MongoDB Connection
mongoose.connect("mongodb+srv://MongoDB:DBPassword@database.e9ihn.mongodb.net/SIT725?retryWrites=true&w=majority&appName=Database")

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB", db.name);
});

// Schema and Model
const projectSchema = new mongoose.Schema({
  name: String,
  description: String,
  imageURL: String,
  githubLink: String,
  technologies: [String],
});

const Project = mongoose.model("Project", projectSchema, "projects");

app.get("/api/projects", async (req, res) => {
  try {
    console.log("Fetching projects...");
    const projects = await Project.find(); // Fetch all projects
    res.json(projects); // Send response
  } catch (err) {
    console.error("Error fetching projects:", err);
    res.status(500).send(err);
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  setInterval(()=>{
    socket.emit('number', parseInt(Math.random()*10));
    }, 1000);
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});