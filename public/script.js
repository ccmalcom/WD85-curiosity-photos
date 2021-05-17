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
let nextBtn = document.querySelector('.next')
let previousBtn = document.querySelector('.prev')
let submitForm = document.querySelector('form')
let dateOfPhotos = document.querySelector('#inputDate')
let cameraSelect = document.querySelector('#cameraSelect');
let infoDiv = document.querySelector('#info')
let totalImg = document.querySelector('#totalImg')
infoDiv.style.display = 'none'
let nav = document.querySelector('nav')
let pageNumber = 1;
submitForm.addEventListener('submit', totalImage)
nextBtn.addEventListener('click', nextPage)
previousBtn.addEventListener('click', prevPage)

nav.style.display = 'none'

let imageCount = 0;

function totalImage(e) {
    e.preventDefault();
    infoDiv.style.display = 'flex'
    infoDiv.style.flexDirection = 'column'
    if (cameraSelect.value == 0) {
        url = baseURL + dateOfPhotos.value + '&api_key=' + apiKey
        console.log('URL: ', url);
        fetch(url)
            .then(function (result) {
                return result.json();
            })
            .then(function (json) {
                imageCount = json.photos.length 
                totalImg.innerText = `Total IMG: ${imageCount} (25 per page) `
                roverPhotos(e);
            })
        } else {
            url = baseURL + dateOfPhotos.value + '&camera=' + cameraSelect.value  +'&api_key=' + apiKey
            console.log('URL: ', url);
            fetch(url)
            .then(function (result) {
                return result.json();
            })
            .then(function (json) {
                imageCount = json.photos.length
                totalImg.innerText = `Total IMG: ${imageCount} (25 per page)`
                roverPhotos(e);
            })
        }
    }
function roverPhotos(e) {
    e.preventDefault();
    if (cameraSelect.value == 0) {
        url = baseURL + dateOfPhotos.value + '&page=' + pageNumber + '&api_key=' + apiKey
        console.log('URL: ', url);
        fetch(url)
            .then(function (result) {
                return result.json();
            })
            .then(function (rImg) {
                console.log(rImg);
                displayPhotos(rImg);
            })
    } else {
        url = baseURL + dateOfPhotos.value + '&camera=' + cameraSelect.value  + '&page=' + pageNumber +'&api_key=' + apiKey
        console.log('URL: ', url);
        fetch(url)
            .then(function (result) {
                return result.json();
            })
            .then(function (rImg) {
                console.log(rImg);
                displayPhotos(rImg);
            })
    }
}
let imageDiv = document.querySelector('#imgHere')
function displayPhotos(rImg) {
    while (imageDiv.firstChild) {
        imageDiv.removeChild(imageDiv.firstChild)
    }
    if (rImg.photos.length === 0) {
        if(!alert('There are no photos for the selected date')){ window.location.reload(); }
    } else {
        for (i = 0; i < rImg.photos.length; i++) {
            let photoURL = rImg.photos[i].img_src;
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
            idNum.innerHTML = 'Photo ID: ' + rImg.photos[i].id + '<br>' + 'Camera: ' + rImg.photos[i].camera.name

            imageDiv.appendChild(cdiv)
            cdiv.appendChild(heightDiv)
            heightDiv.appendChild(imgLink)
            imgLink.appendChild(img)
            heightDiv.appendChild(cardBody)
            cardBody.appendChild(idNum)
            console.log(imageDiv);
        }
    }    
    nav.style.display = 'flex'
    nav.style.justifyContent = 'space-between'
    nav.style.width = '90vw'
    nav.style.margin = '0 auto 0 auto'
    nav.style.padding = '0 12px'
    document.getElementById('displayPage').innerText = pageNumber
    document.getElementById('displayPage').style.color = 'antiqueWhite'
}

// if (pageNumber <= 1) { // tests if pageNumber is 0
//     previousBtn.style.display = "none"; //if pageNumber is 0, hide the prevBtn
// } else {
//     previousBtn.style.display = 'block'
// }

//     if (rImg.length >= 25) { //tests if there are 10 or less articles
//       nav.style.display = "block";
//     } else {
//       nav.style.display = "none"; //hide nav if there are 10 or less results
//     }  

// if (pageNumber > 1){
//     previousBtn.style.display = 'block'
// } else {
//     previousBtn.style.display = 'none'
// }



function nextPage(e){
    pageNumber++;
    roverPhotos(e);
    console.log("Page number:", pageNumber);
}

function prevPage(e){
    if(pageNumber >= 1){
        pageNumber--;
    } else{
        return;
    }
    roverPhotos(e);
    console.log("Page:", pageNumber);
}

// let i=0;
// let txt = 'Use this site to see photos from the Mars Curiosity Rover by date as well as by camera. The Curiosity Rover landed on August 6, 2012, so photos before that date will not be available.';
// let speed = 50;

// function typeWriter(){
//     if (i < txt.length){document.getElementById(thisText).innerHTML += txt.charAt(i); i++;
//     setTimeout(typeWriter, speed);
//     }