


export default function addProject() {
    const div = document.createElement('div')
    div.classList.add('popup-form');
    
    const submit = document.createElement('button')
    submit.classList.add('submit');
    submit.textContent = "Submit";
    submit.addEventListener('click',addProjectInfo)
    
    const cancel = document.createElement('button')
    cancel.classList.add('cancel');
    cancel.innerHTML = "Cancel";
    cancel.addEventListener('click',closePopup);
   
    div.appendChild(createInput("text", "Project Name", "project"));
    div.appendChild(createInput("date","Due By", 'duedate'));
    div.appendChild(createTextArea());
    div.append(submit,cancel);

    
    document.body.appendChild(div);
    // window.addEventListener('click',closePopup);
console.log("Adding Project");

}

function createInput(type,placeholder, id) {
    const input = document.createElement('input');
    const label = document.createElement('label');
    label.setAttribute("for",placeholder);
    label.textContent = placeholder;
    input.type = type;
    input.id = id;
    input.placeholder = placeholder;
    label.appendChild(input)
    console.log("Adding Input");
    return label;
}

function createTextArea(){
    const textarea = document.createElement('textarea');
    return textarea
}

function closePopup() {
 const popup = document.querySelector('.popup-form');
 popup.remove();
    console.log("Closing Popup");

}

function addProjectInfo() {
    const projectname = document.getElementById('project');
    const duedate = document.getElementById('duedate');
    const p = document.createElement('p');
    p.textContent = `Due Date: ${duedate.value}`;
    const h3 = document.createElement('h3')
    h3.textContent = `Project: ${projectname.value}`;
    

    //buttons
    const btndiv = document.createElement('div')
    btndiv.classList.add('btn-project');
    
    const btnX = document.createElement('button');
    btnX.textContent = 'Delete';
    btnX.addEventListener('click',deleteProject);
    
    const addTask = document.createElement('button');
    addTask.textContent = 'Add Task'
    addTask.addEventListener('click',addTaskInput);
    btndiv.append(btnX,addTask)
    
    //create new project box
    const newdiv = document.createElement('div');
    newdiv.classList.add('project-div');
    console.log(projectname.id);
    newdiv.appendChild(h3);
    newdiv.appendChild(p);
    newdiv.appendChild(btndiv);
    
    const main = document.querySelector('.main');
    main.appendChild(newdiv);
    
    closePopup();
}

function deleteProject() {
    console.log("DELETED PROJECT");

}

function addTaskInput() {
    console.log("ADDING TASK");
}