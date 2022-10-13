// Global Variables - can access anywhere

// get URL parameter values
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get('id');
let productData = [];

//taking products from the API with IDs
fetch(`http://localhost:3000/api/products/${productId}`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    renderProduct(data);
    productData = data;
    console.log(data);
  })
  .catch((error) => {
    console.log('Error ' + error);
  });

// take articles from the fetch and add them to the DOM
const renderProduct = (fetchProductData) => {
  document.querySelector('.item__img').innerHTML =
    '<img class="prodImg" src="' +
    fetchProductData.imageUrl +
    '" alt="Kanap company logo">';
  document.querySelector('#title').innerText = fetchProductData.name;
  document.querySelector('#price').innerText = fetchProductData.price;
  document.querySelector('#description').innerText =
    fetchProductData.description;

  // forEach loop for the colours
  fetchProductData.colors.forEach((color) => {
    document.querySelector('#colors').innerHTML +=
      '<option value="' + color + ' "> ' + color + ' </option>';
  });
  document.querySelector('#addToCart').dataset.productId = fetchProductData._id;
};

//create empty array in the localStorage
const createLocalstorageList = () => {
  try {
    if (window.localStorage.getItem('cartItems')) {
      return;
    }
    window.localStorage.setItem('cartItems', JSON.stringify([]));
    return window.localStorage.getItem('cartItems');
  } catch (event) {
    console.error(event);
  }
};

createLocalstorageList();

// add product to the localstorage
function addToLocalStorage(product) {
  try {
    const cartItemsLocal = JSON.parse(localStorage.getItem('cartItems'));

    const prodColour = document.querySelector('#colors').value;
    const prodQuantity = parseInt(document.querySelector('#quantity').value);

    const newProduct = { ...product, prodColour, prodQuantity };

    cartItemsLocal.push(newProduct);
    window.localStorage.setItem('cartItems', JSON.stringify(cartItemsLocal));
  } catch (event) {
    console.error(event);
  }
}

// function addToLocalstorage(newProductId, data) {
//   try {
//     let cartItemsLocal = JSON.parse(localStorage.getItem('cartItems'));

//     const prodColour = document.querySelector('#colors').value;
//     const prodQuantity = document.querySelector('#quantity').value;

//     const prodImg = data.imageUrl;
//     const prodName = data.name;
//     const prodPrice = data.price;

//     if (cartItemsLocal === null) {
//       // IF cart is empty add to local storage without anything else
//       let aProd = {
//         prodColour: prodColour,
//         prodQuantity: Number(prodQuantity),
//         productId: newProductId,
//         prodImg: prodImg,
//         prodName: prodName,
//         prodPrice: prodPrice,
//         // need add the price
//       };

//       window.localStorage.setItem('cartItems', JSON.stringify(aProd));

//       console.log(aProd);
//     } else {
//       // NOW check for existing product in local storage
//       const localStorageId = cartItemsLocal.productId;

//       if (newProductId === localStorageId) {
//         let newQty = Number(cartItemsLocal.prodQuantity) + Number(prodQuantity);
//         cartItemsLocal.prodQuantity = newQty;

//         // update the local storage
//         window.localStorage.setItem(
//           'cartItems',
//           JSON.stringify(cartItemsLocal)
//         );
//       }
//     }
//   } catch (event) {
//     console.error(event);
//   }
// }

const addBtn = document.querySelector('#addToCart');
addBtn.addEventListener('click', (event) => {
  event.preventDefault();

  addToLocalStorage(productData);
});
