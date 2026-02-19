// Developed by Ubaidulla
// Cognifyz Internship – Task 5
// Intern Project Management REST API

const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

// Temporary in-memory storage
let projects = [];

// Helper function
function findProject(id) {
  return projects.find(p => p.id === id);
}

// GET all projects
app.get("/api/projects", (req, res) => {
  res.json(projects);
});

// GET single project
app.get("/api/projects/:id", (req, res) => {
  const project = findProject(Number(req.params.id));
  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }
  res.json(project);
});

// CREATE project
app.post("/api/projects", (req, res) => {
  const { title, description, priority } = req.body;

  if (!title || !description || !priority) {
    return res.status(400).json({ message: "All fields required" });
  }

  const newProject = {
    id: Date.now(),
    title,
    description,
    priority,
    status: "Pending",
    createdAt: new Date().toLocaleString()
  };

  projects.push(newProject);
  res.status(201).json(newProject);
});

// UPDATE project status
app.put("/api/projects/:id", (req, res) => {
  const project = findProject(Number(req.params.id));
  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  project.status = req.body.status || project.status;
  res.json(project);
});

// DELETE project
app.delete("/api/projects/:id", (req, res) => {
  projects = projects.filter(p => p.id !== Number(req.params.id));
  res.json({ message: "Project deleted" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
