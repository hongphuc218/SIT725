const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

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
    console.log("Projects fetched:", projects);
    res.json(projects); // Send response
  } catch (err) {
    console.error("Error fetching projects:", err);
    res.status(500).send(err);
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
