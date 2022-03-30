var prev = document.getElementById('previous');
var next = document.getElementById('next');

var arr = ["https://s.yimg.com/ny/api/res/1.2/F9fvvfdL_RxhxKvrb2e36w--/YXBwaWQ9aGlnaGxhbmRlcjt3PTcwNTtoPTExNDc7Y2Y9d2VicA--/https://s.yimg.com/uu/api/res/1.2/Q.XsOpWKlYjKpb5VMsyU6g--~B/aD0xNTAwO3c9OTIyO2FwcGlkPXl0YWNoeW9u/https://media.zenfs.com/en/insider_articles_922/1d683e9e95b3cfd74da0275c1eee191c", "https://michiganrockandrolllegends.com/images/Meatloaf%20closeJPEG%2065%20early%20Texas.jpg", "https://i.ebayimg.com/images/g/b-kAAOSwHztiJopV/s-l500.jpg", "https://s.hdnux.com/photos/01/23/55/01/21942379/3/1200x0.jpg"];

let i = 0;

//next btn
next.addEventListener('click', function(){
    i++;
    if(i > arr.length - 1){
        i = 0;
    }
    document.getElementById('image').src = arr[i];
})

//previous btn
previous.addEventListener('click', function(){
    i--;
    if(i < 0){
        i = arr.length - 1;
    }
document.getElementById('image').src = arr[i];
})

let weather = {
    "apiKey": "f90d5b8d3c77b9f8344263b1f9c7aaa1",
    fetchWeather: function(city){
        fetch(
        "https://api.openweathermap.org/data/2.5/weather?q="
         + city 
         + "&units=metric&appid=" 
         + this.apiKey
        )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        const { name } = data;
        const { temp } = data.main;
        console.log(name,temp)
        document.querySelector(".city").innerText = "weather in " + name;
        document.querySelector(".temp").innerText = temp + "C";
    },

    search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
    },
};
document.getElementById("searchBtn").next.addEventListener('click',  function (){
    weather.search();
  });

   