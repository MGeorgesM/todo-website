const input = document.getElementById("myInput");
const addBtn = document.getElementById("add-btn");
const todoList = document.querySelector(".mytodo");

function getInputText() {
    const inputText = input.value.trim();
    if (inputText === "") {
        alert("Please enter a valid task");
        return;
    }
    createNewTodoElement(inputText)
}

function createNewTodoElement(inputText) {
    const todoDiv = document.createElement("div");
    todoDiv.innerHTML = `<div class="todo-item"><p id="todo-text">${inputText}</p><button class="delete-btn">X</button></div>`;

    const todoText = todoDiv.querySelector("#todo-text");
    todoDiv.addEventListener("click", function () {
        console.log('Marking as Done');
        todoText.classList.toggle("checked");
        saveTodos();
    })

    const delBtn = todoDiv.querySelector(".delete-btn")
    delBtn.addEventListener("click", function () {
        console.log('Delete Clicked');
        todoList.removeChild(todoDiv);
        saveTodos();
    });

    todoList.appendChild(todoDiv);
    input.value = "";
    saveTodos();
}

function saveTodos() {
    const todos = Array.from(document.querySelectorAll('#todo-text'))
        .map(todo => todo.textContent);

    localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodos() {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (saveTodos) {
        savedTodos.forEach(todo => {
            createNewTodoElement(todo)
        });
    }
}

document.addEventListener("DOMContentLoaded", loadTodos)

addBtn.addEventListener("click", getInputText);

input.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        createNewTodo();
    }
});
