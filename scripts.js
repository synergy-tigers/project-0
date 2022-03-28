// created by: rhys kim
// modified last on: 03.28.2022

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

      // check if the element is another obj, an array, or a string
      switch (Object.getPrototypeOf(element)) {
        case Object.prototype:
          let value = iterate(element);

          fields.append(title);
          let contentBody = title.insertAdjacentElement('afterend', field);
          let keyString = key.replace("_", " ");

          title.innerHTML = keyString;
          // theres a lot of objects within objects...
          if (isObject(element)) {
            iterate(value);
            contentBody.innerHTML = value;
          } else {
            contentBody.innerHTML = value;
          }
          break;
        case Array.prototype:
          // convert the element from object to array then loop through the array's objects
          let array = Array.from(element);
          // first, check if array is NOT empty
          if (!(array.length == 0)) {
            // then add the name of each array to tablehead
            table.append(row);
            
            let header = document.createElement('th');
            let thead = row.appendChild(header);
            let keyString = key.replace("_", " ");
           
            thead.innerHTML = keyString;
            
            // loop through the array
            array.forEach(arrItem => {
              // check if the array is storing an obj
              if (isObject(arrItem)) {
                // if it is, then loop through and
                // print out the result
                let value = iterate(arrItem);
                let item = thead.insertAdjacentElement('afterend', cell);
                item.innerHTML += `<span class="tag">${value}</span>`;
              } else if (key == "desc" | key == "higher_level") {
                let item = thead.insertAdjacentElement('afterend', cell);
                item.innerHTML += `<p>${arrItem}</p>`
              } else {
                // else just print the array item
                let item = thead.insertAdjacentElement('afterend', cell);
                item.innerHTML += `<span class="tag">${arrItem}</span>`;
              }
            });
          }
          break;
        default:
          // lets remove the key-value pairs that have index or url
          if (checkKey(key)) {
            delete key;
          } else {
            // then loop through the keys and print them out in headers
            fields.append(title);

            let keyString = key.replace("_", " ");
            title.innerHTML = keyString;
            
            let content = title.insertAdjacentElement("afterend", field);
            content.innerHTML = element;
          }
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

// no need to display url or index or _id tbqh
// we're going to check any key against url, index, or _id!
function checkKey(key) {
  const array = ["url", "index", "_id"];
  if (array.includes(key)) {
    return true;
  }

  return false;
}

// sometimes there's objects within objects, so we want to test if something IS an object
function isObject(obj) {
  if (typeof obj === "object") {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        return true;
      }
    }    
  } 

  return false;
};

// ... then recursively loop through the object's properties!
// link to solution: https://stackoverflow.com/a/27124279
function iterate(obj) {
  for (const key in obj) {
    // check if the object has properties + keys are valid
    if (obj.hasOwnProperty(key) && (checkKey(key) == false)) {
      let value = obj[key];

      // if the value is another object, keep looping through.
      if (isObject(value)) {
        iterate(value);
      } else {
        return value;
      }
    } else {
      delete key;
    }
  }
};

// we need to clear all data to grab a fresh spell
function clear() {
  let fields = document.querySelector("#spellFields");
  let table = document.querySelector("#spellData");
  
  fields.innerHTML = "";
  table.innerHTML = "";
}