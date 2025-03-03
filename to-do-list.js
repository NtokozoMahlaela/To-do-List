let tasks = [];
        let recentlyDeleted = [];
        let stickyNotes = [];

        function addTask() {
            let taskInput = document.getElementById("taskInput");
            let taskText = taskInput.value.trim();
            let importantCheck = document.getElementById("importantCheck").checked;
            if (taskText === "") return;

            let task = {
                text: taskText,
                important: importantCheck,
                completed: false,
                timestamp: new Date(),
            };
            tasks.push(task);
            renderTasks();

            taskInput.value = "";
            document.getElementById("importantCheck").checked = false;
        }

        function renderTasks() {
            const taskList = document.getElementById("taskList");
            taskList.innerHTML = "";
            tasks.forEach((task, index) => {
                let li = document.createElement("li");
                let taskDiv = document.createElement("div");
                taskDiv.classList.add("task-content");

                let checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.checked = task.completed;
                checkbox.onchange = function() {
                    task.completed = checkbox.checked;
                    renderTasks();
                };

                let span = document.createElement("span");
                span.textContent = task.text;
                if (task.important) {
                    span.classList.add("important");
                }
                if (task.completed) {
                    span.classList.add("completed");
                }

                let editButton = document.createElement("button");
                editButton.textContent = "Edit";
                editButton.onclick = function() {
                    taskInput.value = span.textContent;
                    taskInput.focus();
                    tasks.splice(index, 1);
                    renderTasks();
                };

                let removeButton = document.createElement("button");
                removeButton.textContent = "Remove";
                removeButton.onclick = function() {
                    recentlyDeleted.push(task);
                    tasks.splice(index, 1);
                    renderTasks();
                };

                let timestamp = document.createElement("div");
                timestamp.classList.add("timestamp");
                timestamp.textContent = `Added on: ${task.timestamp.toLocaleString()}`;

                taskDiv.appendChild(checkbox);
                taskDiv.appendChild(span);
                taskDiv.appendChild(editButton);
                taskDiv.appendChild(removeButton);
                li.appendChild(taskDiv);
                li.appendChild(timestamp);
                taskList.appendChild(li);
            });
        }

        function handleMenuChange() {
            const menu = document.getElementById("menu").value;
            document.getElementById("calendar").style.display = "none";
            document.getElementById("stickyWall").style.display = "none";
            document.getElementById("recentlyDeleted").style.display = "none";

            if (menu === "calendar") {
                document.getElementById("calendar").style.display = "block";
            } else if (menu === "stickyWall") {
                document.getElementById("stickyWall").style.display = "block";
            } else if (menu === "recentlyDeleted") {
                document.getElementById("recentlyDeleted").style.display = "block";
                renderRecentlyDeleted();
            } else if (menu === "completed") {
                renderCompletedTasks();
            }
        }

        function renderCompletedTasks() {
            const taskList = document.getElementById("taskList");
            taskList.innerHTML = "";
            tasks.filter(task => task.completed).forEach(task => {
                let li = document.createElement("li");
                li.textContent = task.text;
                taskList.appendChild(li);
            });
        }

        function setReminder() {
            const reminderDate = document.getElementById("reminderDate").value;
            alert(`Reminder set for: ${reminderDate}`);
        }

        function addStickyNote() {
            const stickyNoteText = document.getElementById("stickyWallInput").value.trim();
            if (stickyNoteText === "") return;
            stickyNotes.push(stickyNoteText);
            renderStickyNotes();
            document.getElementById("stickyWallInput").value = "";
        }

        function renderStickyNotes() {
            const stickyNotesList = document.getElementById("stickyNotesList");
            stickyNotesList.innerHTML = "";
            stickyNotes.forEach(note => {
                let li = document.createElement("li");
                li.textContent = note;
                stickyNotesList.appendChild(li);
            });
        }

        function renderRecentlyDeleted() {
            const deletedList = document.getElementById("recentlyDeletedList");
            deletedList.innerHTML = "";
            recentlyDeleted.forEach((task, index) => {
                let li = document.createElement("li");
                li.textContent = task.text;

                let permanentDeleteButton = document.createElement("button");
                permanentDeleteButton.textContent = "Permanent Delete";
                permanentDeleteButton.onclick = function() {
                    permanentlyDeleteTask(index);
                };

                li.appendChild(permanentDeleteButton);
                deletedList.appendChild(li);
            });
        }

        function permanentlyDeleteTask(index) {
            recentlyDeleted.splice(index, 1);
            renderRecentlyDeleted();
        }

        function permanentlyDelete() {
            recentlyDeleted = [];
            renderRecentlyDeleted();
        }