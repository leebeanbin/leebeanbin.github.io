const clockContainer = document.querySelector(".js-clock"),
    clockTitle = clockContainer.querySelector("h1");


function getTime() {
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const sec = date.getSeconds();
    clockTitle.innerText = `${hours < 10 ?  `0${hours}` : hours}:${
        minutes < 10 ? `0${minutes}` : minutes
    }:${sec < 10 ? `0${sec}` : sec
    }`;
}
/*${sec < 10 ? `0${sec} : sec`} 이건 if 처럼 만약 sec < 10 이면 
sec 앞에 0을 붙이고 아니면 그냥 sec만 출력 하는 것이다. (삼항 연산자)*/
function init() {
    getTime();
    setInterval(getTime, 1000);

}
init();