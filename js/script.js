const taskList = document.getElementById("task-list");
let tasks = [];

function renderTasks() {
  const filter = document.getElementById("filter-select")?.value || "all";
  taskList.innerHTML = "";

  let filteredTasks = tasks.map((task, index) => ({ ...task, index }));

  if (filter === "pending") {
    filteredTasks = filteredTasks.filter(task => !task.done);
  } else if (filter === "done") {
    filteredTasks = filteredTasks.filter(task => task.done);
  }

  if (filteredTasks.length === 0) {
    taskList.innerHTML = `
      <tr>
        <td colspan="4" class="py-4 text-gray-400">No task found</td>
      </tr>`;
    return;
  }

  filteredTasks.forEach((taskObj) => {
    const { text, date, done, index } = taskObj;
    const row = document.createElement("tr");
    row.className = "border-t border-slate-700";
    row.innerHTML = `
      <td class="px-2 py-2">${text}</td>
      <td class="px-2 py-2">${date}</td>
      <td class="px-2 py-2">${done ? "Done" : "Pending"}</td>
      <td class="px-2 py-2 space-x-2">
        <button onclick="toggleStatus(${index})" class="bg-green-500 hover:bg-green-600 px-2 py-1 rounded text-sm">Toggle</button>
        <button onclick="deleteTask(${index})" class="bg-red-500 hover:bg-red-600 px-2 py-1 rounded text-sm">Delete</button>
      </td>
    `;
    taskList.appendChild(row);
  });
}


function addTask() {
  const text = document.getElementById("todo-input").value.trim();
  const date = document.getElementById("due-date").value;

  if (!text || !date) {
    alert("Please enter task and due date.");
    return;
  }

  tasks.push({ text, date, done: false });
  document.getElementById("todo-input").value = "";
  document.getElementById("due-date").value = "";
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function toggleStatus(index) {
  tasks[index].done = !tasks[index].done;
  renderTasks();
}

function deleteAllTasks() {
  if (tasks.length === 0) {
    alert("No tasks to delete.");
    return;
  }

  const confirmDelete = confirm("Are you sure you want to delete all tasks?");
  if (confirmDelete) {
    tasks = [];
    renderTasks();
  }
}

