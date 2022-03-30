/*  Created By: Jonathan Thomas
    Last Updated: 03/25/2022
    Description: Project 0 JavaScript
*/

const dogImages = ["Kaido1.jpg","Kaido2.jpg","Kaido3.jpg","Kaido4.jpg"];
const imgPath = document.getElementById('kaido').src;
let arrCount = 0;

window.onload = () => {

    document.getElementById('prev').addEventListener('click', prevImage);
    document.getElementById('next').addEventListener('click', nextImage);
    document.getElementById('kaido').src = document.getElementById('kaido').src + dogImages[arrCount]
    
}

function nextImage(event){
    if(arrCount < dogImages.length - 1){
        arrCount++;
        document.getElementById('kaido').src = imgPath + dogImages[arrCount]
    }
}

function prevImage(event){

    if(arrCount > 0 ){
        arrCount--;
        document.getElementById('kaido').src = imgPath + dogImages[arrCount]
    }

}