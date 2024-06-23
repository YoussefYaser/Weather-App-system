// navbar humburgerBar

let humburgerBar = document.getElementById('humburger-bar');
let humburgerToggler = document.getElementById('humburger-toggler')

humburgerToggler.onclick = function(){
    if(! this.classList.contains('collapsed')){
        humburgerBar.children[0].style.setProperty('animation-name', 'bar-top-forward');
        humburgerBar.children[2].style.setProperty('animation-name','bar-bottom-forward');
    }
    else{
        humburgerBar.children[0].style.setProperty('animation-name', 'bar-top-backward');
        humburgerBar.children[2].style.setProperty('animation-name','bar-bottom-backward');
    }
}

//--------------------------------------------------------------------------------------------------------

var search = document.getElementById('searchFloatingInput');
var header = document.querySelectorAll('.header');
var content = document.querySelectorAll('.content');

var myCity;


search.addEventListener('input', async function(event){
    if(this.value.length>=3){
        var url =  await getData(this.value);
        if(url.ok){
            myCity  = await url.json();
            showData();
        }
    }
});


function showData(){
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    for(var i=0; i<3; i++){
        var myDate = new Date(myCity.forecast.forecastday[0].date);
        
        if(i===0){
            header[0].children[0].innerHTML = days[myDate.getDay()];   // day name
            header[0].children[1].innerHTML = myDate.getDate() + months[myDate.getMonth()];  //day num with month
            content[0].children[0].innerHTML = myCity.location.name; //city name or location
            content[0].children[1].children[0].innerHTML = '<span style="transform: translateY(-30px);">o</span>C';
            content[0].children[1].children[0].prepend(myCity.current["temp_c"]); //  temp
            content[0].children[1].children[1].src = myCity.current.condition.icon; // weather photo condition
            content[0].children[2].innerHTML = myCity.current.condition.text; // weather condition
            content[0].children[3].children[0].children[1].innerHTML =  myCity.forecast.forecastday[0].day["daily_chance_of_rain"] + '%';
            content[0].children[3].children[1].children[1].innerHTML =  myCity.current["wind_kph"] + 'kpH';
            content[0].children[3].children[2].children[1].innerHTML =  myCity.current["wind_dir"] ;
        }
        else{
            let next = (myDate.getDay() + i) % 7;
            header[i].innerHTML = days[next]; //day name
            content[i].children[0].src = myCity.forecast.forecastday[i].day.condition.icon;  // weather photo condition
            content[i].children[1].innerHTML= '<span style="transform: translateY(-10px);">o</span>C'
            content[i].children[1].prepend(myCity.forecast.forecastday[i].day["maxtemp_c"]); // max temp 
            content[i].children[2].innerHTML= '<span style="transform: translateY(-10px);">o</span>C'
            content[i].children[2].prepend(myCity.forecast.forecastday[i].day["mintemp_c"]); // min temp
            content[i].children[3].innerHTML = myCity.forecast.forecastday[i].day.condition.text; // weather condition
        }
    }
}


// fetch API

async function getData(city){
    var url = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=3fadd93a1fa947b9a10151450241806&q=${city}&days=3`);
    return  url;
}

(
    async function(){
        var url =  await getData('cairo');
        myCity  = await url.json();
        showData();
    }
)();

//--------------------------------------------------------------------------------------------------------