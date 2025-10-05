// ========================================
// STEP 1: Setup Event Listener for Page Load
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // STEP 2: Select DOM Elements
    // ========================================
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    
    // ========================================
    // STEP 3: Load Tasks from Local Storage
    // ========================================
    function loadTasks() {
        // Retrieve tasks from Local Storage
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        
        // Loop through stored tasks and add them to the DOM
        storedTasks.forEach(taskText => {
            addTask(taskText, false); // 'false' means don't save to Local Storage again
        });
    }
    
    // ========================================
    // STEP 4: Create the addTask Function with Local Storage
    // ========================================
    function addTask(taskText, save = true) {
        // If called from button/Enter, get the input value
        if (save) {
            taskText = taskInput.value.trim();
            
            // Check if taskText is empty
            if (taskText === "") {
                alert("Please enter a task!");
                return;
            }
        }
        
        // ========================================
        // Task Creation
        // ========================================
        // Create a new list item (li) element
        const listItem = document.createElement('li');
        listItem.textContent = taskText;
        
        // Create a "Remove" button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add('remove-btn');
        
        // ========================================
        // Task Removal with Local Storage Update
        // ========================================
        removeButton.onclick = function() {
            // Remove from DOM
            taskList.removeChild(listItem);
            
            // Remove from Local Storage
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            const updatedTasks = storedTasks.filter(task => task !== taskText);
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        };
        
        // Append the remove button to the list item
        listItem.appendChild(removeButton);
        
        // Append the list item to the task list
        taskList.appendChild(listItem);
        
        // ========================================
        // Save to Local Storage (only if 'save' is true)
        // ========================================
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
            
            // Clear the input field
            taskInput.value = "";
        }
    }
    
    // ========================================
    // STEP 5: Load Tasks When Page Loads
    // ========================================
    loadTasks();
    
    // ========================================
    // STEP 6: Attach Event Listeners
    // ========================================
    // Add event listener to the "Add Task" button
    addButton.addEventListener('click', function() {
        addTask('', true);
    });
    
    // Add event listener for "Enter" key press
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask('', true);
        }
    });
});
