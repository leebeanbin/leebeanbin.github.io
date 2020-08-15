const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

function filterFn(toDo){
    return toDo.id === 1;
}

function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        console.log(toDo.id, li.id);
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos
    saveToDos();
    console.log(cleanToDos);
    /* filter는 모든 아이템들을 가지고 true인 값 만을 모아서 
    새로운 array를 형성한다.*/
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
    /*JSON.strigify()는 괄호 안에 값(object)을 string으로 바꿔 준다.
    JSON을 사용하면 OBJECT ==> STRING, STRING ==> OBJECT로 만들어 줄수 이씀*/
}

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerText = "🙌🏻";
    delBtn.addEventListener("click",deleteToDo);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);  
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    /*이런식으로 하는 이유는 localStorage에도 toDos를 저장 해야하기 문이다. */
    toDos.push(toDoObj);
    saveToDos();
    /*push 한 이후에 호출해야 한다. 왜냐하면 saveToDos를 실행 시켜도 불러올게 없음*/
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}



function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
            /* 기본적으로 함수를 실행하는데 array에 담겨있는것을 하나 씩 다 실행 시킨다!*/
        })
    }
}


function init(){
    loadToDos();
    toDoForm.addEventListener("submit",handleSubmit);
}

init();