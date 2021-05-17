apiKey = 'aeO57b0XTZXifluNQEhP8Gbu4xQEh31BBzM6IzEL'
baseURL = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date='

//! max date = today
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1;
var yyyy = today.getFullYear();
if (dd < 10) {
    dd = '0' + dd
}
if (mm < 10) {
    mm = '0' + mm
}

today = yyyy + '-' + mm + '-' + dd;
document.getElementById("inputDate").setAttribute("max", today);

let submitBtn = document.querySelector('#button')
let submitForm = document.querySelector('form')
let dateOfPhotos = document.querySelector('#inputDate')
submitForm.addEventListener('submit', roverPhotos)
let cameraSelect = document.querySelector('#cameraSelect');
let infoDiv = document.querySelector('#info')
let totalImg = document.querySelector('#totalImg')
infoDiv.style.display = 'none'

function roverPhotos(e) {
    e.preventDefault();
    if (cameraSelect.value == 0) {
        url = baseURL + dateOfPhotos.value + '&api_key=' + apiKey
        console.log('URL: ', url);
        fetch(url)
            .then(function (result) {
                return result.json();
            })
            .then(function (json) {
                console.log(json);
                displayPhotos(json);
            })
    } else {
        url = baseURL + dateOfPhotos.value + '&camera=' + cameraSelect.value + '&api_key=' + apiKey
        console.log('URL: ', url);
        fetch(url)
            .then(function (result) {
                return result.json();
            })
            .then(function (json) {
                console.log(json);
                displayPhotos(json);
            })
    }
}
let imageDiv = document.querySelector('#imgHere')
function displayPhotos(json) {
    while (imageDiv.firstChild) {
        imageDiv.removeChild(imageDiv.firstChild)
    }
    infoDiv.style.display = 'flex'
    infoDiv.style.flexDirection = 'column'
    if (json.photos.length === 0) {
        alert('There are no photos for the selected date')
    } else {
        for (i = 0; i < json.photos.length; i++) {
            let photoURL = json.photos[i].img_src;
            console.log(photoURL);
            let cdiv = document.createElement('div')
            cdiv.setAttribute('class', 'col')

            let heightDiv = document.createElement('div')
            heightDiv.setAttribute('class', 'card h-100')

            let img = document.createElement('img')
            img.setAttribute('class', 'card-img-top')
            img.setAttribute('src', photoURL)

            let cardBody = document.createElement('div')
            cardBody.setAttribute('class', 'card-body')

            let imgLink = document.createElement('a')
            imgLink.setAttribute('href', photoURL)
            imgLink.setAttribute('target', 'blank')

            let idNum = document.createElement('p')
            idNum.setAttribute('class', 'card-text')
            idNum.innerHTML = 'Photo ID: ' + json.photos[i].id + '<br>' + 'Camera: ' + json.photos[i].camera.name

            imageDiv.appendChild(cdiv)
            cdiv.appendChild(heightDiv)
            heightDiv.appendChild(imgLink)
            imgLink.appendChild(img)
            heightDiv.appendChild(cardBody)
            cardBody.appendChild(idNum)
            console.log(imageDiv);
        }
        totalImg.innerText = 'Total IMG: ' + json.photos.length
    }

}

// let i=0;
// let txt = 'Use this site to see photos from the Mars Curiosity Rover by date as well as by camera. The Curiosity Rover landed on August 6, 2012, so photos before that date will not be available.';
// let speed = 50;

// function typeWriter(){
//     if (i < txt.length){document.getElementById(thisText).innerHTML += txt.charAt(i); i++;
//     setTimeout(typeWriter, speed);
//     }
// }