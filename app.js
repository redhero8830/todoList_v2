const input = document.querySelector("input");
const addBtn = document.querySelector("#addBtn");
const tasklist = [];

addBtn.addEventListener("click", addTask);

function addTask() {
  let taskContent = input.value;
  tasklist.push(taskContent);

  render()
}

function render() {
  let resultHTML = "";
  for (let list of tasklist) {
    resultHTML += `<div class="task">
    <div>${list}</div>
    <div>
        <button>Check</button>
        <button>Button</button>
    </div>
    </div>`;
  }

  document.querySelector("#task-board").innerHTML = resultHTML;
}
