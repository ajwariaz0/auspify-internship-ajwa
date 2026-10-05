// Selecting elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const totalTasksEl = document.getElementById('totalTasks');
const completedTasksEl = document.getElementById('completedTasks');

// Load tasks from Local Storage on startup
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Render tasks initially
renderTasks();

// Add task event listener
addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

function addTask() {
    const text = taskInput.value.trim();
    if (text === '') {
        alert('Please enter a valid task!');
        return;
    }

    const newTask = {
        id: Date.now(),
        text: text,
        completed: false
    };

    tasks.push(newTask);
    saveAndRender();
    taskInput.value = '';
}

// Toggle Task Completion Status
function toggleTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });
    saveAndRender();
}

// Delete Task
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveAndRender();
}

// Save to Local Storage & Update UI
function saveAndRender() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

// Render Tasks Function (DOM Manipulation)
function renderTasks() {
    taskList.innerHTML = '';

    if (tasks.length === 0) {
        taskList.innerHTML = '<p style="text-align:center; color:#9ca3af; font-size:14px; padding:20px;">No tasks yet. Add one above!</p>';
    }

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;

        li.innerHTML = `
            <div class="task-content" onclick="toggleTask(${task.id})">
                <input type="checkbox" ${task.completed ? 'checked' : ''}>
                <span>${escapeHtml(task.text)}</span>
            </div>
            <button class="delete-btn" onclick="deleteTask(${task.id})"><i class="fa-solid fa-trash"></i></button>
        `;

        taskList.appendChild(li);
    });

    // Update Counters
    totalTasksEl.textContent = tasks.length;
    completedTasksEl.textContent = tasks.filter(t => t.completed).length;
}

// Security helper to prevent HTML injection
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}