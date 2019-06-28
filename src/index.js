console.log('%c HI', 'color: firebrick')

// CALLBACK LISTENING FNs
function changeColor(event) {
  const li = event.target
  var letters = '0123456789ABCDEF';
  var the_color = '#';
  for (var i = 0; i < 6; i++) {
    the_color += letters[Math.floor(Math.random() * 17)];
  }
  li.style.color = the_color
}


function dogFilter(event) {
  const choice = event.target.value
  const dogs = document.querySelectorAll('li')
  let breedArray = [];
  dogs.forEach(dog => {
    breedArray.push(dog.innerText)
  })
  dogs.forEach(dog => dog.remove())
  // if the item does not start with the choice, remove from the page
  const result = breedArray.filter(breed => breed.startsWith(choice))
  
  result.forEach(dog => {
    const searchDog =  document.createElement('li')
    const ul = document.querySelector('#dog-breeds')
    searchDog.innerText = dog
    ul.append(searchDog)
  })
}

// PUTTING STUFF ON DOM
function addDogToDom(dog, dogContainer) {
  const image = document.createElement('img')
  image.src = dog
  dogContainer.append(image)
}

function addBreedToDom(breed, ul) {
  const li = document.createElement('li')
  li.innerText = breed
  li.className = "dogBreed"
  li.addEventListener("click", changeColor)
  ul.append(li)
}

// ITERATING JSON OBJECT
function getDogs(dogs) {
  const dogContainer = document.querySelector('#dog-image-container')
  dogs.message.forEach(function(dog){addDogToDom(dog, dogContainer)})
}

function getBreeds(breeds) {
  const ul = document.querySelector('#dog-breeds')
  Object.keys(breeds.message).forEach(function(breed){addBreedToDom(breed, ul)})
}

// FETCH REQUESTS / EVENT LISTENERS
document.addEventListener("DOMContentLoaded", function(){
  fetch("https://dog.ceo/api/breeds/image/random/4")
  .then(response => response.json())
  .then(getDogs)

  fetch("https://dog.ceo/api/breeds/list/all")
  .then(response => response.json())
  .then(getBreeds)

  const dropdown = document.querySelector('#breed-dropdown')
  dropdown.addEventListener("change", dogFilter)
})
