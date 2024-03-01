const loginForm = document.getElementById('login-form');
const loginComponent = document.getElementById('login-component')
const todoComponent = document.getElementById('todo-component')
const input = document.getElementById('myInput');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
let todoItems = [];
let todoDeleteBtns = [];

loginForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'AdminSEF123' && password === 'SeF@ctORy$$456') {
        loginComponent.classList.toggle('remove');
        todoComponent.classList.toggle('remove');
    } else {
        alert('Invalid username or password');
    }
});

function createTodo() {
    const inputText = input.value.trim()
    if (inputText === '') {
        alert('Please enter a valid task');
        return;
    }
    input.value = "";
    todoElementGenerator(inputText);
    todoItemEventListener();
    todoDeleteEventListener();
    save();
}

function todoElementGenerator(inputText, isChecked = false) {
    const checkClass = isChecked ? 'checked' : '';
    const todoToGenerate = `<div class='todo-item flex space-between primary-text'>
                <p class='todo-text ${checkClass}'>${inputText}</p>
                <button class='delete-btn primary-text white-bg'>x</button>
            </div>`;
    todoList.innerHTML += todoToGenerate;
}

function todoItemEventListener() {
    const todoItems = document.querySelectorAll('.todo-item');
    for (let i = 0; i < todoItems.length; i++) {
        todoItems[i].addEventListener("click", function () {
            const todoItem = todoItems[i].querySelector('.todo-text');
            todoItem.classList.toggle("checked");
            save();
        })
    }
}

function todoDeleteEventListener() {
    const todoDeleteBtns = document.querySelectorAll('.delete-btn');
    for (let i = 0; i < todoDeleteBtns.length; i++) {
        todoDeleteBtns[i].addEventListener("click", function () {
            const todoToDelete = todoDeleteBtns[i].parentNode;
            todoToDelete.remove();
            save();
        })
    }
}

function save() {
    const todosToSave = [];
    const todosElements = document.querySelectorAll('.todo-text');
    for (let i = 0; i < todosElements.length; i++) {
        const todoToSave = {
            todoText: todosElements[i].textContent,
            isChecked: todosElements[i].classList.contains('checked'),
        };

        todosToSave.push(todoToSave)
    }

    localStorage.setItem('todos', JSON.stringify(todosToSave));
}

function load() {
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    if (savedTodos) {
        for (let i = 0; i < savedTodos.length; i++) {
            todoElementGenerator(savedTodos[i].todoText, savedTodos[i].isChecked)
        }
        todoItemEventListener();
        todoDeleteEventListener();
    }
}

document.addEventListener('DOMContentLoaded', load)

addBtn.addEventListener('click', createTodo);