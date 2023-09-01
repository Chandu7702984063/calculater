// Get references to HTML elements
const taskInput = document.getElementById('taskInput'); // Input field for adding tasks
const addTaskBtn = document.getElementById('addTaskBtn'); // Button for adding tasks
const clearCompletedBtn = document.getElementById('clearCompletedBtn'); // Button for clearing completed tasks
const taskList = document.getElementById('taskList'); // Task list
const totalTasks = document.getElementById('totalTasks'); // Display total task count

// Get references to filter buttons
const allBtn = document.getElementById('allBtn');
const completeBtn = document.getElementById('completeBtn');
const uncompleteBtn = document.getElementById('uncompleteBtn');

// Initialize task ID
let taskId = 1;

// Event listeners for adding tasks, clearing completed tasks, and filtering tasks
addTaskBtn.addEventListener('click', addTask);
clearCompletedBtn.addEventListener('click', clearCompletedTasks);
allBtn.addEventListener('click', showAllTasks);
completeBtn.addEventListener('click', showCompletedTasks);
uncompleteBtn.addEventListener('click', showUncompletedTasks);

// Function to add a new task
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        // Create a new task item
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <input type="checkbox">
            <span class="task-text">${taskText}</span>
            <span class="cancel-symbol"> (X)</span>
        `;

        // Add event listeners for checkbox and cancel symbol
        const checkbox = taskItem.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', toggleTaskStatus);

        const cancelSymbol = taskItem.querySelector('.cancel-symbol');
        cancelSymbol.addEventListener('click', deleteTask);

        // Add the task item to the task list
        taskList.appendChild(taskItem);
        
        // Update the total task count and reset input field
        updateTotalTasks();

        taskId++;
        taskInput.value = '';
    }
}

// Function to toggle the status of a task (completed or not)
function toggleTaskStatus(event) {
    const taskItem = event.target.parentElement;
    const cancelSymbol = taskItem.querySelector('.cancel-symbol');

    if (event.target.checked) {
        cancelSymbol.style.display = 'inline'; // Show cancel symbol when checked
    } else {
        cancelSymbol.style.display = 'none'; // Hide cancel symbol when not checked
    }

    // Update the total task count
    updateTotalTasks();
}

// Function to clear completed tasks
function clearCompletedTasks() {
    const completedTasks = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'));
    completedTasks.forEach(task => {
        const taskItem = task.parentElement;
        taskList.removeChild(taskItem);
    });

    // Update the total task count
    updateTotalTasks();
}

// Function to show all tasks
function showAllTasks() {
    toggleFilterBtn(allBtn);
    showTasksByCategory('all');
}

// Function to show completed tasks
function showCompletedTasks() {
    toggleFilterBtn(completeBtn);
    showTasksByCategory('completed');
}

// Function to show uncompleted tasks
function showUncompletedTasks() {
    toggleFilterBtn(uncompleteBtn);
    showTasksByCategory('uncompleted');
}

// Function to toggle the active state of filter buttons
function toggleFilterBtn(selectedBtn) {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => btn.classList.remove('active'));
    selectedBtn.classList.add('active');
}

// Function to filter tasks by category (all, completed, or uncompleted)
function showTasksByCategory(category) {
    const tasks = document.querySelectorAll('li');
    tasks.forEach(task => {
        if (category === 'all' || (category === 'completed' && task.querySelector('input[type="checkbox"]').checked) || (category === 'uncompleted' && !task.querySelector('input[type="checkbox"]').checked)) {
            task.style.display = 'flex';
        } else {
            task.style.display = 'none';
        }
    });
}

// Function to delete a task
function deleteTask(event) {
    const taskItem = event.target.parentElement;
    taskList.removeChild(taskItem);

    // Update the total task count
    updateTotalTasks();
}

// Function to update the total task count
function updateTotalTasks() {
    totalTasks.textContent = taskList.children.length;
}
