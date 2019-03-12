//Define UI vars.
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector("#task");
const clearBtn = document.querySelector('.clear-tasks');

loadEventListener();

function loadEventListener() {
    form.addEventListener('submit', addTask);
}

function addTask(e) {
    if (taskInput.value === '') {
        alert('Add task');
    }

    const li = document.createElement('li');
    const liText = document.createTextNode(taskInput.value);
    li.className = 'collection-item';
    li.appendChild(liText);

    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);
    taskList.appendChild(li);

    taskInput.value = '';

    e.preventDefault();
}