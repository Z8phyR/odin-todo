import { addNewProject, updateProjects } from "./addproject";
import "./style.css";

const addProject = document.getElementById("add-project");
addProject.addEventListener("click", addNewProject);
updateProjects();
