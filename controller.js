// controller.js
/*
    Created By: Andy Park
    Last Updated: 03/30/2022
    Description: fetch API, Google Translation for my index.html
*/

function updateTranslateData(event) {
    if (event.code && event.code != 'Enter') return;

    inputsBusy();
    let translateSentence = document.querySelector("input[type=text]").value;
    
    getTranslate(translateSentence)
        .then(response => {
            populatePage(response);
            inputsReady();
        })
        .catch(error => {
            showPopup();
            console.error(`Request resulted in an error: ${error}`);
            inpustsReady();
        });

function inputsBusy(){
    let inputs = document.querySelectorAll("section[role=search] *");
    for (let ele of inputs) {
            ele.setAttribute("aria-busy", "true");
            ele.disabled = true;
    }
}   

function inputsReady() {
    let inputs = document.querySelectorAll("selection[role=search] *");
    setTimeout(() => {
        for (let ele of inputs) {
            ele.setAttribute("aria-busy", "false");
            ele.disabled = false;
        }
        let input = document.querySelector(".text=box");
        input.focus();
        input.setSelectionRange(0, input.value.length;
    }, 500);
}

function populatePage(payload) {
    translateData = payload;
    document.querySelector("#sentence").innerText = getTraslateSentence();

    function getTraslateSentence() {
        return "Translate Sentense: " + translateData.stats.base_stat;
    }
}