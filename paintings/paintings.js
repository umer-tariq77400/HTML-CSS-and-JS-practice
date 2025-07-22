images = {
  list: [
    {
      name: "Last Supper",
      author: "Leonardo da Vinci",
      dateOfCreation: "1495",
    },
    {
      name: "Starry Night",
      author: "Vincent van Gogh",
      dateOfCreation: "1889",
    },
    { name: "The Scream", author: "Edvard Munch", dateOfCreation: "1893" },
    { name: "Guernica", author: "Pablo Picasso", dateOfCreation: "1937" },
    { name: "The Kiss", author: "Gustav Klimt", dateOfCreation: "1907" },
    {
      name: "Girl With a Pearl Earring",
      author: "Johannes Vermeer",
      dateOfCreation: "1665",
    },
    {
      name: "The Birth of Venus",
      author: "Sandro Botticelli",
      dateOfCreation: "1485",
    },
    { name: "Las Meninas", author: "Diego Velazquez", dateOfCreation: "1656" },
    {
      name: "The Creation of Adam",
      author: "Michelangelo",
      dateOfCreation: "1512",
    },
  ],
  add: function (name, author, dateOfCreation) {
    if (!this.contains(name)) {
      this.list.push(new Image(name, author, dateOfCreation));
    }
  },
  contains: function (title) {
    return this.list.some((image) => {
      return image.name === title;
    });
  },
  show: function (title) {
    this.list.some((image) => {
      if (image.name === title) {
        console.log(
          `Name: ${image.name} Author: ${image.author} Date of Creation: ${image.dateOfCreation}`
        );
        return true;
      }
    });
  },
  clear: function () {
    this.list = [];
  },
  edit: function (title, author, dateOfCreation) {
    this.list.some((image) => {
      if (image.name === title) {
        image.author = author;
        image.dateOfCreation = dateOfCreation;
        return true;
      }
    });
  },
  delete: function (title) {
    this.list.some((image) => {
      if (image.name === title) {
        this.list.splice(this.list.indexOf(image), 1);
        return true;
      }
    });
  },
};

Image = function (name, author, dateOfCreation) {
  this.name = name;
  this.author = author;
  this.dateOfCreation = dateOfCreation;
};

// A function for deep comparison of two objects(ingoring the methods, only attributes) using recursion
function deepComp(obj1, obj2){
  // Check if both are objects
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
    return "Only objects are allowed for comparison"; 
  }
  // Check if both are null
  if (obj1 === null || obj2 === null) {
     return "Null values are not allowed for comparison"; 
  }
  // Check if they are the same reference
  if (obj1 === obj2) {
    return true;
  }

  // Now starting the deep comparison
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  // Check if they have the same number of keys
  if (keys1.length !== keys2.length) {
    return false;
  }
  // Check if all keys and values are the same
  for (let key of keys1) {
    // Check if the key exists in both objects
    if (!keys2.includes(key)) {
      return false;
    }
    // Check if the values are objects, if so, call deepEqual recursively
    if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      if (!deepComp(obj1[key], obj2[key])) {
        return false;
      }
    }
    // If they are not objects, check if they are equal
    else if (obj1[key] !== obj2[key]) {
      return false;
    }
  }
  // If all checks passed, the objects are deeply equal
  return true;
} 

let a={x:[1,2,3,4,5], y:0, z: {m:'test', n:false}};
let b={x:[1,2,3,4,5], y:0, z: {m:'test', n:false}};
let c={x:[1,2,3,4,5,6], y:0, z: {m:'test', n:false}};
let d={x:[1,2,3,4], y:0, z: {m:'test', n:false}};
let e={x:[1,2,3,4,5], y:0, z: {m:'test', n:true}};
let f={x:[1,2,3,4,5], y:-1, z: {m:'test', n:false}};
console.log(deepComp(a,b)); // -> true
console.log(deepComp(a,c)); // -> false
console.log(deepComp(a,d)); // -> false
console.log(deepComp(a,e)); // -> false
console.log(deepComp(a,f)); // -> false

// Create a proper show method for Image instances
Image.prototype.show = function () {
  console.log(
    `Name: ${this.name} Author: ${this.author} Date of Creation: ${this.dateOfCreation}`
  );
};

// Fix the arrow function to actually return the object
getImage = (name, author, dateOfCreation) => ({ name, author, dateOfCreation });
