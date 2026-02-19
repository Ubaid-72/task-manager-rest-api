// Developed by Ubaidulla
// Cognifyz Internship – Task 5

let currentFilter = "All";

async function fetchProjects() {
  const res = await fetch("/api/projects");
  const projects = await res.json();
  renderProjects(projects);
}

function renderProjects(projects) {
  const container = document.getElementById("projectList");
  container.innerHTML = "";

  projects
    .filter(p => currentFilter === "All" || p.status === currentFilter)
    .forEach(project => {
      const div = document.createElement("div");
      div.className = "project" + (project.status === "Completed" ? " completed" : "");

      div.innerHTML = `
        <h4>${project.title}</h4>
        <p>${project.description}</p>
        <p><strong>Priority:</strong> ${project.priority}</p>
        <p><strong>Status:</strong> ${project.status}</p>
        <p><small>Created: ${project.createdAt}</small></p>

        <button onclick="markCompleted(${project.id})">Mark Completed</button>
        <button onclick="deleteProject(${project.id})">Delete</button>
      `;

      container.appendChild(div);
    });
}

async function addProject() {
  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();
  const priority = document.getElementById("priority").value;

  if (!title || !description || !priority) {
    alert("All fields are required");
    return;
  }

  await fetch("/api/projects", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description, priority })
  });

  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  document.getElementById("priority").value = "";

  fetchProjects();
}

async function markCompleted(id) {
  await fetch(`/api/projects/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: "Completed" })
  });

  fetchProjects();
}

async function deleteProject(id) {
  await fetch(`/api/projects/${id}`, { method: "DELETE" });
  fetchProjects();
}

function filterProjects(status) {
  currentFilter = status;
  fetchProjects();
}

// Load on start
fetchProjects();
