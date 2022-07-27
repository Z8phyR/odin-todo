import addProject from "./addproject";


export default function init() {
    console.log("Initalize Page");
    createHeader();
    createSide();
    createMain();

function createHeader() {
    const header = document.createElement('header');
    const h1 = document.createElement('h1');
    const button = document.createElement('button');
    const p = document.createElement('p');
    const div = document.createElement('div');

    h1.textContent = "To Do List"
    header.appendChild(h1);
    p.textContent = "To Do List for adding and removing things in your list"
    header.appendChild(p);
    document.body.appendChild(header);
    //Add Project Button
    button.textContent = "Add Project";
    button.id = "add-project";
    button.addEventListener('click',addProject);

    div.classList.add('buttons');
    div.appendChild(button);
    header.appendChild(div);
    addProfileData();
}
//add profile data
function addProfileData() {
    const div = document.createElement('div');
    div.classList.add('profile');
    div.style.backgroundColor = 'lightgreen';
    const img = document.createElement('div');
    img.style.backgroundColor = 'lightblue';
    img.style.width = '30px';
    img.style.height = '30px';
    img.style.borderRadius = '10px';
    const h2 = document.createElement('h2');
    const button = document.createElement('button');
    button.textContent = "Login";
    const header = document.querySelector('header');
    
    h2.textContent = "Profile";
    div.appendChild(img);
    div.appendChild(h2);
    div.appendChild(button);
    header.appendChild(div);
}

function createSide()  {
    const div = document.createElement('div');
    div.id = "sidebar";
    const body = document.body;
    div.style.height= '100%'
    div.style.width = '20vw'
    div.style.position = 'absolute';
    div.style.right = '0'
    div.style.top = '180px'
    div.style.backgroundColor = 'green';
    const h2 = document.createElement('h2');
    h2.textContent = "Current Tasks";
    body.appendChild(div);
    div.appendChild(h2);
}

function createMain() {
    const div = document.createElement('div');
    div.classList.add('main');
    document.body.appendChild(div);

}
}
