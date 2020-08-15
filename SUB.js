const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList"),
    toDoFin = document.querySelector("js-finList");

const TODOS_LS = "PENDING";
const TODOS_FIN = "FINISHED";

let toDos = [];
let fin = [];

function saveToDos(){
    localStorage.setItem(TODOS_LS,JSON.stringify(toDos));
}

function saveToDone(){
    localStorage.setItem(TODOS_FIN,JSON.stringify(fin));
}

function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
}

function shiftFin(event){
    if(toDos.length){
        const btn = event.target;
        const li = btn.parentNode; 
        const giri = li;
        deleteToDo(event);
        giri.id = toDos.length + 1 ;
        const checking = giri.querySelectorAll("button")[0];
        checking.innerText = "⏪";
        const toDoneObj = {
            text: giri.querySelector("span").innerText,
            id: giri.id
        };
        paintToDone(giri.querySelector("span").innerText);
        fin.push(toDoneObj);
        saveToDone();
    }
}

function shiftFined(event){
    if(toDos.length){
        const btn = event.target;
        const li = btn.parentNode;
        const giri = li;
        deleteToDo(event);
        giri.id = toDos.length + 1;
        const checking = giri.querySelectorAll("button")[0];
        checking.innerText = "➡️";
        const toDoObj = {
            text: giri.querySelector("span").innerText,
            id: giri.id
        };
        toDos.push(toDoObj);
        paintToDo(giri.querySelector("span").innerText);
        saveToDos();
    }
}
function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const shiftBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length +1;
    delBtn.innerText = "✖️";
    delBtn.addEventListener("click",deleteToDo);
    shiftBtn.innerText = "➡️";
    shiftBtn.addEventListener("click",shiftFin);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(shiftBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function paintToDone(text){
    const li = document.querySelector('li');
    const delBtn = document.createElement("button");
    const shiftBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length +1;
    delBtn.innerText = "✖️";
    delBtn.addEventListener("click",deleteToDo);
    shiftBtn.innerText = "⏪";
    shiftBtn.addEventListener("click",shiftFined);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(shiftBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoOj = {
        text: text,
        id: newId
    };
    fin.push(toDoObj);
    saveToDone();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDoList() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    const loadedToDone = localStorage.getItem(TODOS_FIN);
    if (loadedToDos !== null) {
      const parsedToDos = JSON.parse(loadedToDos);
      parsedToDos.forEach(function (toDo) {
        paintToDo(toDo.text);
      });
    }
    if (loadedToDone !== null) {
      const parsedToDos = JSON.parse(loadedToDone);
      parsedToDos.forEach(function (toDo) {
        paintToDone(toDo.text);
      });
    }
  }
  
  function init() {
    loadToDoList();
    toDoForm.addEventListener("submit", handleSubmit);
  }
  
  init();
  