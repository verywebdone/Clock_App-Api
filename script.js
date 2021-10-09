let apiQuoteRequest = 'https://api.quotable.io/random';
let apiLocation = "https://api.freegeoip.app/json/?apikey=0ca02b90-2679-11ec-9d71-919657632f04";
let apiTimeZone = "http://worldtimeapi.org/api/ip";
const place = document.getElementById("location");
const apiQuotation = document.querySelectorAll(".ApiQuotation");
const extraInfo = document.querySelectorAll(".timeZoneApi");
const clock = document.getElementById("clock");
const button = document.getElementById("button");
const spanbuttons = document.getElementById("button").children;
const animation = document.querySelectorAll(".animation");
const daynightToggle = document.querySelectorAll(".dayNight")
const extra = document.querySelector(".extraInfo");
const border = document.querySelector(".border");
console.log(extra);
let QuotationProp = ["content", "author"];
let timeZoneInfo = ["abbreviation", "timezone", "day_of_year", "day_of_week", "week_number"];
let timeZone;
let city;
let quotation;

const getTime = () => {
    let d = new Date()
    let hours = d.getHours();
    let minutes = d.getMinutes();
    if (hours<10){
        hours = `0${hours}`
    }
    if (minutes<10){
        minutes = `0${minutes}`
    }
    clock.textContent = `${hours}:${minutes}`
    upDateBG(hours);
}

const upDateBG = (hours) => {
    let x = window.matchMedia("(max-width:599px)");
    let y = window.matchMedia("(max-width:899px)");
    let z = window.matchMedia("(min-width:900px)");
    hours = 11;
    if(hours<12){
        daynightToggle[0].classList.toggle("hidden");
        daynightToggle[1].classList.toggle("hidden");
        extra.style.backgroundColor = "rgba(255, 255, 255, 0.7)"
        extra.style.color = "black"
        border.style.borderColor = "rgba(0, 0, 0, 0.4)"
    }
    if(x.matches && hours>=12){
        document.body.style.backgroundImage = "url('/assets/mobile/bg-image-nighttime.jpg')";
    } else if (y.matches && hours>=12){
        document.body.style.backgroundImage = "url('/assets/tablet/bg-image-nighttime.jpg')"
    }   else if (z.matches  && hours>=12) {
        document.body.style.backgroundImage = "url('/assets/desktop/bg-image-nighttime.jpg')"
    }   else if (x.matches  && hours<12){
        document.body.style.backgroundImage = "url('/assets/mobile/bg-image-daytime.jpg')"
    }   else if (y.matches  && hours<12) {
        document.body.style.backgroundImage = "url('/assets/tablet/bg-image-daytime.jpg')"
    }   else {
        document.body.style.backgroundImage = "url('/assets/desktop/bg-image-daytime.jpg')"
    }
}

const updateTimeZone = () => {
    extraInfo.forEach((e, i) => {
        e.textContent = timeZone[timeZoneInfo[i]];
    })
    extraInfo[0];
}

const updateLocation = () => {
    let initialNations = city["country_name"].split(" ").map(e => e[0]).join("")
    place.textContent = `${city["city"]}, ${initialNations}`;
}

const updateQuotation = () => {
  

    apiQuotation[0].textContent = `"${quotation["content"]}"`;
    apiQuotation[1].textContent = quotation["author"];
}

async function getTimeZone(){
    const response = await fetch(apiTimeZone)
    timeZone = await response.json();
    updateTimeZone();
}

async function getQuotation(){
    const response = await fetch(apiQuoteRequest)
    quotation = await response.json()
    updateQuotation()
}

async function getLocation(){
    const response = await fetch(apiLocation)
    city = await response.json()
    updateLocation()
}

setInterval(() => {
    getTime();
}, 60000);

const showInfo = () => {
    spanbuttons[0].classList.toggle("hidden")
    spanbuttons[1].classList.toggle("hidden")
    animation[0].classList.toggle("quoteAnimation")
    animation[1].classList.toggle("displayAnimation")
    animation[2].classList.toggle("imgAnimation")
    animation[3].classList.toggle("extraInfoAnimation")
}

getTime();
getQuotation();
getLocation();
getTimeZone();

button.addEventListener("click", showInfo)
