// created by: rhys kim
// modified last on: 03.27.2022

// grab the api url
const apiUrl = "https://www.dnd5eapi.co";

// connect to api
async function getContent() {
  try {
    // find total first
    const totalUrl = await fetch(`${apiUrl}/api/spells`);
    let total = await totalUrl.json();
    let count = total.count;
    let spells = total.results;

    // get random id of spell and find its url
    let index = getRandomNumber(0, count);
    let spellId = spells[index];
    let spellUrl = spellId.url;

    // then we're going to make ANOTHER call using data from above and display the result
    const spellData = await fetch(`${apiUrl}${spellUrl}`);
    let spell = await spellData.json();
    return spell;
  } catch (err) {
    console.error(err);
  }
}

// now to grab the data from getcontent and display it for the whole world to see
function displayData(obj) {
  // print the properties in the resulting object from api
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      const element = obj[key];

      // first, set up the data in html
      const body = document.getElementById("spellCard");
      const fields = document.getElementById("spellFields");
      const table = document.getElementById("spellData");
      let row = document.createElement("tr");
      let cell = document.createElement("td");
      let title = document.createElement("h2");
      let field = document.createElement("p");

      // loop through the keys and print them out in headers
      body.appendChild(title);
      title.innerHTML = key;

      // check if the element is another obj, an array, or a string
      switch (Object.getPrototypeOf(element)) {
        case Object.prototype:

          // iterate through the object's properties
          iterate(element);

          console.log(element);
          break;
        case Array.prototype:
          // convert the element from object to array then loop through the array's objects
          let array = Array.from(element);
          // first, check if array is NOT empty
          if (!array.length == 0) {
            array.forEach(arrItem => {
              // check if the array is storing an obj
              if (isObject(arrItem)) {
                iterate(arrItem);
              } else {
                // else just print the array item
                console.log(arrItem);
              }
            });
          }
          break;
        default:
          console.log(key + ": " + element);
          break;
      }
    }
  }
}

// run this function every time the button is pressed
function generateSpell() {
  getContent().then(data => {
    clear();
    displayData(data);
  }).catch(err => {
    console.error(err);
  });
}

// helper functions
// random number generator for spell
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

// sometimes there's objects within objects, so we want to test if something IS an object
function isObject(obj) {
  if (typeof obj === "object") {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        return true;
      }
    }    
  } else {
    return false;
  }
};

// ... then recursively loop through the object's properties!
// link to solution: https://stackoverflow.com/a/27124279
function iterate(obj) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      let value = obj[key];

      // if the value is another object, keep looping through.
      // otherwise, just return the key AND value
      if (isObject(value)) {
        iterate(value);
      } else {
        return value;
      }
    }
  }
};

// we need to clear all data to grab a fresh spell
function clear() {
  const body = document.querySelector("#spellCard");
  return body.innerHTML = "";
}