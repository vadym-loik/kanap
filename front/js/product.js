import { addToCart } from './cart.js';

// get URL parameter values
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get('id');
let productData = {};

//taking products from the API with IDs
fetch(`http://localhost:3000/api/products/${productId}`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    renderProduct(data);

    productData = data;
    // console.log(data);
  })
  .catch((error) => {
    console.log('Error ' + error);
  });

// take articles from the fetch and add them to the DOM
const renderProduct = (data) => {
  document.querySelector('.item__img').innerHTML =
    '<img class="prodImg" src="' +
    data.imageUrl +
    '" alt="Kanap company logo">';
  document.querySelector('#title').innerText = data.name;
  document.querySelector('#price').innerText = data.price;
  document.querySelector('#description').innerText = data.description;

  // forEach loop for the colours
  data.colors.forEach((color) => {
    document.querySelector('#colors').innerHTML +=
      '<option value="' + color + ' "> ' + color + ' </option>';
  });
  document.querySelector('#addToCart').dataset.productId = data._id;
};

//create empty array in the localStorage
const createLocalstorageList = () => {
  try {
    if (window.localStorage.getItem('cartItems')) {
      return;
    }
    window.localStorage.setItem('cartItems', JSON.stringify({}));
    return window.localStorage.getItem('cartItems');
  } catch (event) {
    console.error(event);
  }
};
createLocalstorageList();

// add product to the localStoreage on click
const addBtn = document.querySelector('#addToCart');
addBtn.addEventListener('click', (event) => {
  event.preventDefault();

  addToCart(productData);
});
