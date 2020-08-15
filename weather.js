const weather = document.querySelector(".js-weather");


const API_KEY = "e7caee13308eae5a46ce415ce68d5910";
const COORDS = "coords";

function  getwheater(lat,lng){
    fetch(`pi.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    )
    .then(function(response){
    return response.json();
    })
    .then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature} @ ${place}`;
    });
}


function saveCoords(coordsObj){
    localStorage.setItem(COORDS,JSON.stringify(coordsObj));
}


function handleGeoSucces(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getwheater(latitude,longitude);
}

function handleGeoError(){
    console.log("cant access geo location");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces,handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();

    }else{
        const parseCoords = JSON.parse(loadedCoords);
        getwheater(parsedCoords.latitude,parseCoords.longitude);
    }
}

function init(){
    loadCoords();
}

init();