/*  Created By: Jonathan Thomas
    Last Updated: 03/30/2022
    Description: Project 0 JavaScript
*/

const dogImages = ["Kaido1.jpg","Kaido2.jpg","Kaido3.jpg","Kaido4.jpg"];
const imgPath = document.getElementById('kaido').src;
let arrCount = 0;

//loads all the elements that need a listener
window.onload = () => {

    document.getElementById('prev').addEventListener('click', prevImage);
    document.getElementById('next').addEventListener('click', nextImage);
    document.getElementById('kaido').src = document.getElementById('kaido').src + dogImages[arrCount]
    
}

//callback function to change src of image file to change to next one in the list
function nextImage(event){
    if(arrCount < dogImages.length - 1){
        arrCount++;
        document.getElementById('kaido').src = imgPath + dogImages[arrCount]
    }
}

//callback function to change src of image file to get the previous imgae in the list
function prevImage(event){
    if(arrCount > 0 ){
        arrCount--;
        document.getElementById('kaido').src = imgPath + dogImages[arrCount]
    }

}