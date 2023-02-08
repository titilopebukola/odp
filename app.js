// write a constructor function that accepts 2 parameters:
// name
// srcT

// this function should present a product, and also have 2 other properties:
// clicks
// views
// that start at 0

// the constructor should have a property whichi is an array
// each time a new instance of the product is created, it should push itself into the array
// call it constructor product

function Product(name, src) {
  this.name = name;
  this.src = src;
  this.clicks = 0;
  this.views = 0;
  Product.allProducts.push(this);
}

Product.allProducts = [];

const productNames = [
  "bag",
  "banana",
  "bathroom",
  "boots",
  "breakfast",
  "bubblegum",
  "chair",
  "cthulhu",
  "dog-duck",
  "dragon",
  "pen",
  "pet-sweep",
  "scissors",
  "shark",
  "tauntaun",
  "unicorn",
  "water-can",
  "wine-glass",
];

for (let i = 0; i < productNames.length; i++) {
  new Product(productNames[i], `images/${productNames[i]}.jpg`);
}

// use Google to help you write a function that will return a random number
// the number will represent an index value for one of the items in the Product.allProducts array

// Function to generate random number
function randomProductIdx() {
  return Math.floor(Math.random() * Product.allProducts.length);
}

// write a function to render images
// have the images be chosen randomly from our Product.allProductIndex()
// hint, use randomProductIndex()  and bracket notation to access the item in the array
// render our products onto the page
function renderImages() {
  // get three random product indexes
  let Idx1 = randomProductIdx();
  let Idx2 = randomProductIdx();
  let Idx3 = randomProductIdx();

  while (Idx1 === Idx2 || Idx1 === Idx3 || Idx2 === Idx3) {
    Idx2 = randomProductIdx();
    Idx3 = randomProductIdx();
  }

  // get three random product indexes
  const img1 = document.getElementById("img1");
  const img2 = document.getElementById("img2");
  const img3 = document.getElementById("img3");

  img1.src = Product.allProducts[Idx1].src;
  img2.src = Product.allProducts[Idx2].src;
  img3.src = Product.allProducts[Idx3].src;
}

renderImages();
