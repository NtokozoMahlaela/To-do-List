function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();
    let importantCheck = document.getElementById("importantCheck").checked;
    if (taskText === "") return;
    
    let li = document.createElement("li");
    let taskDiv = document.createElement("div");
    taskDiv.classList.add("task-content");
    
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.onchange = function() {
        li.classList.toggle("completed", checkbox.checked);
    };
    
    let span = document.createElement("span");
    span.textContent = taskText;
    if (importantCheck) {
        span.classList.add("important");
    }
    
    let editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.onclick = function() {
        taskInput.value = span.textContent;
        taskInput.focus();
        li.remove();
    };
    
    let removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.onclick = function() {
        li.remove();
    };
    
    let timestamp = document.createElement("div");
    timestamp.classList.add("timestamp");
    let now = new Date();
    timestamp.textContent = `Added on: ${now.toLocaleString()}`;
    
    taskDiv.appendChild(checkbox);
    taskDiv.appendChild(span);
    taskDiv.appendChild(editButton);
    taskDiv.appendChild(removeButton);
    
    li.appendChild(taskDiv);
    li.appendChild(timestamp);
    document.getElementById("taskList").appendChild(li);
    
    taskInput.value = "";
    document.getElementById("importantCheck").checked = false;
}