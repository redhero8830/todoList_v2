const input = document.querySelector(".input");
const addBtn = document.querySelector("#addBtn");
const tabs = document.querySelectorAll(".tab-type div");
let underLine = document.getElementById("under-line");
const taskList = [];
let filterList = [];
let mode = "all";

addBtn.addEventListener("click", addTask);
for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", (event) => {
    filter(event);
  });
}
input.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    addTask(event);
  }
});

function addTask() {
  const task = {
    id: randomId(),
    taskContent: input.value,
    isComplete: false,
  };

  taskList.push(task);
  input.value = "";

  render();
}

function render() {
  let lists = [];
  let result = "";

  if (mode === "all") lists = taskList;
  else lists = filterList;

  for (let list of lists) {
    if (list.isComplete) {
      result += `<div class="task">
      <div>${list.taskContent}</div>
      <div>
          <button onclick=toggleComplete('${list.id}')>✅</button>
          <button onclick=deleteTask('${list.id}')>🧹</button>
      </div>
      </div>`;
    } else {
      result += `<div class="task">
      <div>${list.taskContent}</div>
      <div>
          <button onclick=toggleComplete('${list.id}')>✅</button>
          <button onclick=deleteTask('${list.id}')>🧹</button>
      </div>
      </div>`;
    }
  }
  document.querySelector("#task-board").innerHTML = result;
}

function randomId() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

function toggleComplete(id) {
  for (let list of taskList) {
    if (list.id === id) {
      list.isComplete = !list.isComplete;
      break;
    }
  }
  filter();
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id === id) {
      taskList.splice(i, 1);
      break;
    }
  }
  filter();
}

function filter(e) {
  if (e) {
    mode = e.target.id;
  }

  filterList = [];
  if (mode === "ongoing") {
    for (let task of taskList) {
      if (!task.isComplete) {
        filterList.push(task);
      }
    }
  } else if (mode === "done") {
    for (let task of taskList) {
      if (task.isComplete) {
        filterList.push(task);
      }
    }
  } 
  
  render();
}
