const input = document.getElementById('myInput');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
let todoTexts = [];
let todoDeleteBtns = [];

function createTodo() {
    const inputText = input.value.trim()
    if (inputText === '') {
        alert('Please enter a valid task');
        return;
    }
    const todoElement = todoElementGenerator(inputText);
    todoList.innerHTML += todoElement;
    input.value = "";
    todoTextEventListener();
    todoDeleteEventListener();
    save();
}

function todoElementGenerator(inputText, isChecked = false) {
    const checkClass = isChecked ? 'checked' : '';
    return `<div class='todo-item flex space-between primary-text'>
                <p class='todo-text ${checkClass}'>${inputText}</p>
                <button class='delete-btn primary-text white-bg'>X</button>
            </div>`;
}

function todoTextEventListener() {
    const todoTexts = document.querySelectorAll('.todo-text');
    for (let i = 0; i < todoTexts.length; i++) {
        todoTexts[i].addEventListener("click", function () {
            todoTexts[i].classList.toggle("checked");
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
            const loadedTodo = todoElementGenerator(savedTodos[i].todoText, savedTodos[i].isChecked)
            todoList.innerHTML += loadedTodo
            todoTextEventListener();
            todoDeleteEventListener();
        }
    }
}

document.addEventListener('DOMContentLoaded', load)

addBtn.addEventListener('click', createTodo);