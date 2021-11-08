const toDoform = document.querySelector(".js-toDoForm"),
  toDoinput = toDoform.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

function deleteToDo(event) {
  const btn = event.target;
  const button = btn.parentNode;
  const li = button.parentNode;
  console.log(li);
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  //console.log(cleanToDos);
  toDos = cleanToDos;
  saveTodos();
}

function saveTodos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintTodo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  delBtn.innerHTML = `    <i class="far fa-trash-alt"></i>`;
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: toDos.length + 1,
  };
  toDos.push(toDoObj);
  saveTodos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoinput.value;
  paintTodo(currentValue);
}

async function loadSchedule() {
  const ToDoList = await Schedule.find({ status: 0 });
  const DidList = await Schedule.find({ status: 1 });
  if (ToDoList !== null) {
    const parsedToDo = JSON.parse(ToDoList);
    parsedToDo.forEach(function (toDo) {
      paintTodo(toDo.text);
    });
  }
  if (DidList !== null) {
    const parsedDid = JSON.parse(DidList);
    parsedDid.forEach(function (toDo) {
      paintTodo(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  toDoform.addEventListener("submit", handleSubmit);
}

init();
