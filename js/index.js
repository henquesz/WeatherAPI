const wrapper = document.querySelector(".wrapper"),
inputPart = wrapper.querySelector(".input-part"),
infoTxt = inputPart.querySelector(".info-txt"),
inputField = inputPart.querySelector("input"),
locationBtn = inputPart.querySelector("button"),
icon = wrapper.querySelector(".weather-part img"),
backArrow = wrapper.querySelector("header i");

let api;

inputField.addEventListener("keyup", e =>{
    if(e.key == "Enter"  && inputField.value != ""){
        requestApi(inputField.value);
    }
});

locationBtn.addEventListener("click", () =>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }else{
        alert("Seu navegador não tem suporte a geolocalização.")
    }
});

function onSuccess(position){
    const{latitude, longitude} = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=f9e8a251faa9ddbc4fb42294045c2562`
    fetchData();
}

function onError(error){
    infoTxt.innerText = error.message;
    infoTxt.classList.add("error");
}

function requestApi(city){
    api = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=f9e8a251faa9ddbc4fb42294045c2562`;
    fetchData();
}

function fetchData(){
    infoTxt.innerText = "Obtendo detalhes de clima";
    infoTxt.classList.add("pending");
    fetch(api).then(response => response.json()).then(result => weatherDetails(result));
}

function weatherDetails(info){
    infoTxt.classList.replace("pending", "error");
    if(info.cod == "404"){
        infoTxt.innerText = `${inputField.value} Não é um local válido.`;
    }else{
        const city = info.name;
        const country = info.sys.country;
        const {description, id} = info.weather[0];
        const {feels_like, humidity, temp} = info.main;

        if(id == 800){
            icon.src = "/public/assets/clear.svg";
        }else if(id >= 200 && id <= 232){
            icon.src = "/public/assets/storm.svg";
        }else if(id >= 600 && id <= 622){
            icon.src = "/public/assets/snow.svg";
        }else if(id >= 701 && id <= 781){
            icon.src = "/public/assets/haze.svg";
        }else if(id >= 801 && id <= 804){
            icon.src = "/public/assets/cloud.svg";
        }else if((id >= 300 && id <= 321) || (id >= 500 && id <= 531)){
            icon.src = "/public/assets/rain.svg";
        }
        

        wrapper.querySelector(".temp .numb").innerText = Math.floor(temp);
        wrapper.querySelector(".weather").innerText = description;
        wrapper.querySelector(".location span").innerText = `${city}, ${country}`;
        wrapper.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
        wrapper.querySelector(".humidity span").innerText = `${humidity}%`;

        infoTxt.classList.remove("pending", "error");
        wrapper.classList.add("active");
        console.log(info);
    }
}
backArrow.addEventListener("click", () =>{
    wrapper.classList.remove("active");
});