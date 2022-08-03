let storage = JSON.parse(localStorage.getItem("projects")) || [];
let projectTab = false;
let taskTabWindow = false;

export function addNewProject() {
  if (projectTab == false) {
    projectTab = true;
    const popupDiv = document.createElement("div");
    popupDiv.classList.add("new-project-tab");

    const titleInput = document.createElement("input");
    titleInput.setAttribute("placeholder", "Project Name");
    const dueDateInput = document.createElement("input");
    dueDateInput.setAttribute("placeholder", "Due Date?");
    const submitButton = document.createElement("button");
    submitButton.classList.add("submit-button");
    submitButton.textContent = "Submit";
    submitButton.addEventListener("click", addProject);
    popupDiv.addEventListener("keyup", (event) => {
      if (event.key == "Enter") {
        console.log("ENTER KEY");
        addProject();
      }
    });
    titleInput.setAttribute("type", "text");
    titleInput.classList.add("title-input");

    dueDateInput.setAttribute("type", "date");
    dueDateInput.classList.add("duedate-input");
    popupDiv.append(titleInput, dueDateInput, submitButton);
    document.body.appendChild(popupDiv);
    titleInput.focus();
  } else {
    return;
  }
}

function addProject() {
  const titleInput = document.querySelector(".title-input");
  const dateInput = document.querySelector(".duedate-input");

  if (titleInput.value == "") {
    closeProjectTab();
    return;
  } else {
    const project = {
      title: titleInput.value,
      duedate: dateInput.value,
      tasks: [],
    };

    console.log(project);
    console.log("adding new project into database");
    storage.push(project);
    localStorage.setItem("projects", JSON.stringify(storage));
    projectTab = false;
    updateProjects();
    closeProjectTab();
  }
}

export function updateProjects() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.innerHTML = "<h2>Projects</h2>";
  storage.forEach((project) => {
    const newDiv = document.createElement("div");
    const iconDiv = document.createElement("div");
    const expandBtn = document.createElement("span");
    const deleteBtn = document.createElement("span");
    const h3 = document.createElement("h3");
    const p = document.createElement("p");

    newDiv.classList.add("project-info");
    iconDiv.classList.add("icon-div");
    deleteBtn.classList.add("material-symbols-outlined");
    expandBtn.classList.add("material-symbols-outlined");
    expandBtn.addEventListener("click", () => expandProject(project));
    deleteBtn.addEventListener("click", () => closeProject(project));

    h3.textContent = project.title;
    p.textContent = project.duedate;
    deleteBtn.textContent = "close";
    expandBtn.textContent = "expand_more";

    iconDiv.append(expandBtn, deleteBtn);
    newDiv.append(h3, p, iconDiv);
    sidebar.appendChild(newDiv);
  });
}

function closeProjectTab() {
  const projectTab = document.querySelector(".new-project-tab");
  projectTab.remove();
}

function expandProject(project) {
  const taskDiv = document.querySelector(".tasks");
  taskDiv.innerHTML = "<h2>Current Project</h2>";
  const titleHead = document.createElement("h3");
  const dateHead = document.createElement("p");
  const taskList = document.createElement("div");
  taskList.classList.add("task-lists");
  const addTaskBtn = document.createElement("button");
  addTaskBtn.textContent = "Add Task";

  for (let i = 0; i < project.tasks.length; i++) {
    const newtask = document.createElement("div");
    newtask.classList.add("task-listing");
    newtask.innerHTML = `<input type="text" value = "${project.tasks[i]}" class="task-${i} single-task" readonly>`;
    taskList.appendChild(newtask);

    const btnDiv = document.createElement("div");
    const taskBtn = document.createElement("span");
    taskBtn.classList.add(`material-symbols-outlined`);
    taskBtn.innerText = "close";

    taskBtn.addEventListener("click", () => {
      console.log("Deleting " + project.tasks[i]);
      // project.tasks.splice(project.tasks[i], 1);
      project.tasks = project.tasks.filter((p) => p != project.tasks[i]);
      console.log(project.tasks);
      localStorage.setItem("projects", JSON.stringify(storage));
      expandProject(project);
    });

    const editBtn = document.createElement("span");
    editBtn.classList.add("material-symbols-outlined");
    editBtn.innerText = "edit";

    editBtn.addEventListener("click", () => {
      const taskInput = document.querySelector(`.task-${i}`);
      taskInput.removeAttribute("readonly");
      taskInput.focus();
      taskInput.addEventListener("blur", (e) => {
        taskInput.setAttribute("readonly", true);
        project.tasks[i] = e.target.value;
      });
    });

    btnDiv.append(taskBtn, editBtn);
    newtask.appendChild(btnDiv);
  }

  titleHead.textContent = project.title;
  dateHead.textContent = project.duedate;
  addTaskBtn.addEventListener("click", () => addANewTask(project));
  taskDiv.append(titleHead, dateHead, taskList, addTaskBtn);
}

function closeProject(project) {
  storage = storage.filter((p) => p != project);
  localStorage.setItem("projects", JSON.stringify(storage));
  updateProjects();
  resetTaskWindow();
}

function resetTaskWindow() {
  const taskSection = document.querySelector(".tasks");
  taskSection.innerHTML = `<h2>Current Project</h2> <p>Click a project to see more info</p>`;
}

function addANewTask(project) {
  if (taskTabWindow == false) {
    taskTabWindow = true;
    const newTaskInput = document.createElement("input");
    const h4 = document.createElement("h4");
    h4.textContent = "Add New Task";

    const taskWindow = document.querySelector(".tasks");
    newTaskInput.setAttribute("type", "text");
    const newTaskDiv = document.createElement("div");
    newTaskDiv.classList.add("task-input-div");
    const taskSubmit = document.createElement("button");
    taskSubmit.textContent = "Submit";

    newTaskDiv.appendChild(h4);
    newTaskDiv.appendChild(newTaskInput);
    newTaskDiv.appendChild(taskSubmit);

    newTaskInput.addEventListener("keyup", (event) => {
      if (event.key == "Enter") {
        taskUpdate(project, newTaskInput.value);
      }
    });

    taskSubmit.addEventListener("click", () =>
      taskUpdate(project, newTaskInput.value)
    );

    taskWindow.appendChild(newTaskDiv);
    newTaskInput.focus();
  }
}

function taskUpdate(project, value) {
  if (value == "") {
    taskTabWindow = false;
    closeTaskTab();
    return;
  } else {
    project.tasks.push(value);
    localStorage.setItem("projects", JSON.stringify(storage));
    expandProject(project);
    taskTabWindow = false;
  }
}

function closeTaskTab() {
  let closeTask = document.querySelector(".task-input-div");
  closeTask.remove();
}
