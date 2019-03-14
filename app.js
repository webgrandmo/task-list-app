//Define UI vars.
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector("#task");
const clearBtn = document.querySelector('.clear-tasks');

loadEventListener();

function loadEventListener() {
    document.addEventListener('DOMContentLoaded', getTasks);
    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', removeTask);
    clearBtn.addEventListener('click', clearTasks);
    filter.addEventListener('keyup', filterTasks);
}



function getTasks() {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task) {
        const li = document.createElement('li');
        const liText = document.createTextNode(task);
        li.className = 'collection-item';
        li.appendChild(liText);

        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);
        taskList.appendChild(li);
    });
}

function removeFromLocalStorage(taskitem) {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task, index) {
        if (taskitem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
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

    addToLocalStorage(taskInput.value);


    taskInput.value = '';


    e.preventDefault();
}

function removeTask(e) {
    const li = document.querySelector('.collection-item');
    if (e.target.parentElement.classList.contains('delete-item'))
        li.remove();
    //also could be like this
    //e.target.parentElement.parentElement.remove();

    removeFromLocalStorage(e.target.parentElement.parentElement);
}

function clearFromLocalStorage() {
    localStorage.clear();
}

function clearTasks(e) {
    const items = document.querySelector('.collection');

    console.log(items.firstChild);
    while (items.firstChild) {
        items.removeChild(items.firstChild);

    }

    clearFromLocalStorage();
}

function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function (task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) !== -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}

function addToLocalStorage(task) {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));

    console.log(tasks);

}