document.addEventListener('DOMContentLoaded', () => {
    // 1. Clock & Date
    function updateClock() {
        const now = new Date();
        
        // Time: HH:MM:SS am/pm
        const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
        const timeString = now.toLocaleTimeString('en-US', timeOptions);
        document.getElementById('time').textContent = timeString.toLowerCase();

        // Date: thursday, july 24, 2025
        const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const dateString = now.toLocaleDateString('en-US', dateOptions);
        document.getElementById('date').textContent = dateString.toLowerCase();
    }
    setInterval(updateClock, 1000);
    updateClock();


    // 2. Mock Stats (Simulate activity)
    function updateStats() {
        const load = Math.floor(Math.random() * 50) + 10;
        const ping = Math.floor(Math.random() * 100) + 20;
        const fps = Math.floor(Math.random() * 60) + 100;
        
        document.getElementById('load').textContent = `${load}%`;
        document.getElementById('ping').textContent = `${ping} ms`;
        document.getElementById('fps').textContent = fps;
    }
    setInterval(updateStats, 3000);
    updateStats();


    // 3. Mock Weather (Static for now, could fetch API)
    // No JS needed for static mock, but let's simulate a condition change occasionally
    const conditions = ['sunny', 'cloudy', 'rainy', 'clear'];
    function updateWeather() {
        const condition = conditions[Math.floor(Math.random() * conditions.length)];
        const temp = Math.floor(Math.random() * 20) + 60;
        
        document.getElementById('temp').textContent = `${temp}°`;
        document.getElementById('condition').textContent = condition;
    }
    // setInterval(updateWeather, 60000); // Change every minute


    // 4. Todo List
    const initialTasks = [
        { text: "fix midnight bug today", done: false },
        { text: "dentist reschedule xray", done: false },
        { text: "complete section 3 sun", done: false },
        { text: "finalize trip itinerary", done: false },
        { text: "fix checkmark issue", done: true },
        { text: "handle subtasks", done: true }
    ];

    const todoList = document.getElementById('todo-list');

    function renderTodos() {
        todoList.innerHTML = '';
        initialTasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = `todo-item ${task.done ? 'done' : ''}`;
            
            // Checkbox look
            const check = document.createElement('span');
            check.className = 'todo-check';
            check.textContent = task.done ? '[x]' : '[ ]';
            
            // Text
            const text = document.createElement('span');
            text.textContent = task.text;
            
            li.appendChild(check);
            li.appendChild(text);
            
            // Toggle click
            li.addEventListener('click', () => {
                initialTasks[index].done = !initialTasks[index].done;
                renderTodos();
            });
            
            todoList.appendChild(li);
        });
    }

    renderTodos();
});