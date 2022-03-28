import { getSong, nameForDisplay } from './util.js';

window.onload = () => {
    document.querySelector("#search").addEventListener("click", updateSongData);
    document.querySelector(".text-box").addEventListener("keydown", updateSongData);

    let input = document.querySelector(".text-box");
    input.focus();
    input.setSelectionRange(0, input.value.length);
}
let songData;

function updateSongData(event) {
    if(event.code && event.code != 'Enter') return;

    inputsBusy();
    let songName = document.querySelector("input[type=text]").value;

    getSong(songName)
    .then(response => {
        populatePage(response);
        inputsReady();
    })
    .catch(error => {
        showPopup();
        console.error('Request resulted in an error: ${error}');
        inputsReady();
    });
    
}

function showPopup() {
    let songName = document.querySelector("input[type=text]").value;
    let popup = document.querySelector(".popup");
    document.querySelector("#error-message").innerText = 'It appears the song "${songName}" was not found!';

    popup.classList.remove("flip-out");
    popup.classList.add("flip-in");
    setTimeout(() => {
        popup.classList.remove("flip-in");
        popup.classList.add("flip-out");
    }, 3000);
}

function getSongName() {
    return nameForDisplay(songData.name);
}


var prev = document.getElementById('Previous');
var next = document.getElementById('Next');

var arr = ["https://s.yimg.com/ny/api/res/1.2/F9fvvfdL_RxhxKvrb2e36w--/YXBwaWQ9aGlnaGxhbmRlcjt3PTcwNTtoPTExNDc7Y2Y9d2VicA--/https://s.yimg.com/uu/api/res/1.2/Q.XsOpWKlYjKpb5VMsyU6g--~B/aD0xNTAwO3c9OTIyO2FwcGlkPXl0YWNoeW9u/https://media.zenfs.com/en/insider_articles_922/1d683e9e95b3cfd74da0275c1eee191c", "https://michiganrockandrolllegends.com/images/Meatloaf%20closeJPEG%2065%20early%20Texas.jpg", "https://i.ebayimg.com/images/g/b-kAAOSwHztiJopV/s-l500.jpg", "https://s.hdnux.com/photos/01/23/55/01/21942379/3/1200x0.jpg"];

var i = 0;

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










