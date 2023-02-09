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

let totalClicks = 0;
const maxClicks = 6;

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

  // change the source attribute of img1, img2 &img3 to be the src from our random products
  img1.src = Product.allProducts[Idx1].src;
  img2.src = Product.allProducts[Idx2].src;
  img3.src = Product.allProducts[Idx3].src;

  img1.alt = Product.allProducts[Idx1].name;
  img2.alt = Product.allProducts[Idx2].name;
  img3.alt = Product.allProducts[Idx3].name;

  // increase the views for the three products we are looking at

  Product.allProducts[Idx1].views++;
  Product.allProducts[Idx2].views++;
  Product.allProducts[Idx3].views++;
}

// listen for clicks on the images. check if the thing we clicked on is the container (as opposed to an image)
function handleClick(event) {
  if (event.target === imgContainer) {
    alert("You've got to click on the image");
  } else {
    totalClicks++;
  }

  // To increase clicks, check every single products "name" against the alt tag of the target and increase the clicks
  for (let i = 0; i < Product.allProducts.length; i++) {
    if (event.target.alt === Product.allProducts[i].name) {
      Product.allProducts[i].clicks++;
      break;
    }
  }

  // each time we clicks we need to increase clicks
  // we need to check if we've reached the maximum number of clicks allowed
  // if we have, don't render more images, and remove the eventlistener on the image container
  // we haven't, render more images
  if (totalClicks === maxClicks) {
    alert("Thanks for voting");
    // remove the event listener so the game ends
    imgContainer.removeEventListener("click", handleClick);
    renderChart();
    return;
  } // get three new images
  renderImages();
}

const imgContainer = document.getElementById("img-container");
imgContainer.addEventListener("click", handleClick);

// function for renderChart
function renderChart() {
  let labelArray = [];
  let clicksArray = [];
  let viewsArray = [];

  for (let i = 0; i < Product.allProducts.length; i++) {
    let product = Product.allProducts[i];
    labelArray.push(product.name);
    clicksArray.push(product.clicks);
    viewsArray.push(product.views);
  }
  const data = {
    labels: labelArray,
    datasets: [
      {
        label: "views",
        data: viewsArray,
        backgroundColour: ["yellow", "pink"],
        borderColor: ["pink", "yellow"],
        borderWidth: 1,
      },
      {
        label: "Clicks",
        data: clicksArray,
        backgroundColor: ["blue", "#99e600"],
        borderWidth: 1,
      },
    ],
  };

  const config = {
    type: "bar",
    data: data,
    options: {
      scales: {
        x: {
          ticks: {
            color: "blue",
          },
        },
        y: {
          ticks: {
            color: "blue",
          },
          beginAtZero: true,
        },
      },
    },
  };

  let canvasChart = document.getElementById("myChart");
  const myChart = new Chart(canvasChart, config);

  const config1 = {
    type: "line",
    data: data,
    options: {
      scales: {
        x: {
          ticks: {
            color: "blue",
          },
        },
        y: {
          ticks: {
            color: "blue",
          },
          beginAtZero: true,
        },
      },
    },
  };

  let canvasChart1 = document.getElementById("myChart1");
  const myChart1 = new Chart(canvasChart1, config1);
}

// render the initial images
renderImages();
