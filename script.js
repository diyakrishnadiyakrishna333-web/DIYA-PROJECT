/* NAVIGATION */

function showSection(sectionId, button) {
    document.querySelectorAll(".section").forEach(section => {
        section.classList.remove("active");
    });

    document.querySelectorAll(".nav-btn").forEach(btn => {
        btn.classList.remove("active");
    });

    document.getElementById(sectionId).classList.add("active");
    button.classList.add("active");
}


/* TO-DO LIST */

let todos = JSON.parse(localStorage.getItem("mindflowTasks")) || [];

function saveTodos() {
    localStorage.setItem("mindflowTasks", JSON.stringify(todos));
}

function addTodo() {
    const input = document.getElementById("todoInput");
    const priority = document.getElementById("todoPriority");

    const taskText = input.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        priority: priority.value,
        completed: false
    };

    todos.push(task);

    input.value = "";

    saveTodos();
    renderTodos();
}

function toggleTodo(id) {
    todos = todos.map(task => {
        if (task.id === id) {
            task.completed = !task.completed;
        }

        return task;
    });

    saveTodos();
    renderTodos();
}

function deleteTodo(id) {
    todos = todos.filter(task => task.id !== id);

    saveTodos();
    renderTodos();
}

function renderTodos() {
    const list = document.getElementById("todoList");
    const emptyMessage = document.getElementById("emptyMessage");

    list.innerHTML = "";

    todos.forEach(task => {
        const li = document.createElement("li");

        li.className = "todo-item";

        if (task.completed) {
            li.classList.add("completed");
        }

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.addEventListener("change", () => {
            toggleTodo(task.id);
        });

        const text = document.createElement("span");
        text.className = "todo-text";
        text.textContent = task.text;

        const badge = document.createElement("span");
        badge.className = "priority " + task.priority;
        badge.textContent = task.priority;

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-btn";
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", () => {
            deleteTodo(task.id);
        });

        li.append(checkbox, text, badge, deleteButton);

        list.appendChild(li);
    });

    const completed = todos.filter(task => task.completed).length;
    const pending = todos.length - completed;

    document.getElementById("totalTasks").textContent = todos.length;
    document.getElementById("completedTasks").textContent = completed;
    document.getElementById("pendingTasks").textContent = pending;

    emptyMessage.style.display =
        todos.length === 0 ? "block" : "none";
}


/* MIND MAP */

let ideas = JSON.parse(localStorage.getItem("mindflowIdeas")) || [];

function saveIdeas() {
    localStorage.setItem("mindflowIdeas", JSON.stringify(ideas));
}

function addIdea() {
    const input = document.getElementById("ideaInput");

    const ideaText = input.value.trim();

    if (ideaText === "") {
        alert("Please enter an idea!");
        return;
    }

    ideas.push({
        id: Date.now(),
        text: ideaText
    });

    input.value = "";

    saveIdeas();
    renderIdeas();
}

function deleteIdea(id) {
    ideas = ideas.filter(idea => idea.id !== id);

    saveIdeas();
    renderIdeas();
}

function clearIdeas() {
    if (ideas.length === 0) return;

    if (confirm("Are you sure you want to clear all ideas?")) {
        ideas = [];

        saveIdeas();
        renderIdeas();
    }
}

function renderIdeas() {
    const container = document.getElementById("ideaNodes");

    container.innerHTML = "";

    ideas.forEach(idea => {
        const node = document.createElement("div");

        node.className = "idea-node";

        const text = document.createElement("span");
        text.textContent = idea.text;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "×";
        deleteButton.setAttribute("aria-label", "Delete idea");

        deleteButton.addEventListener("click", () => {
            deleteIdea(idea.id);
        });

        node.append(text, deleteButton);

        container.appendChild(node);
    });
}


/* INITIALIZE */

renderTodos();
renderIdeas();
// Allow users to press Enter to add a task
document.getElementById("taskInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});