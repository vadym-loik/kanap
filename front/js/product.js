// Global Variables - can access anywhere

// get URL parameter values
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get('id');

//taking products from the API with IDs
fetch(`http://localhost:3000/api/products/${productId}`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    renderProduct(data);
    // addToLocalstoreage(data._id);
    // console.log(data);
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

// add product to the localStorage

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

function addToLocalstoreage(newProductId) {
  try {
    let cartItemsLocal = JSON.parse(localStorage.getItem('cartItems'));

    const prodColour = document.querySelector('#colors').value;
    const prodQuantity = document.querySelector('#quantity').value;

    if (cartItemsLocal === null) {
      // IF cart is empty add to local storage without anything else.
      let aProd = {
        prodColour: prodColour,
        prodQuantity: Number(prodQuantity),
        productId: newProductId,
        // need add the price
      };

      window.localStorage.setItem('cartItems', JSON.stringify(aProd));
    } else {
      // NOW check for existing product in local storage
      const localStorageId = cartItemsLocal.productId;

      if (newProductId === localStorageId) {
        let newQty = Number(cartItemsLocal.prodQuantity) + Number(prodQuantity);
        cartItemsLocal.prodQuantity = newQty;

        // update the local storage
        window.localStorage.setItem(
          'cartItems',
          JSON.stringify(cartItemsLocal)
        );
      }
    }
  } catch (event) {
    console.error(event);
  }
}

const addBtn = document.querySelector('#addToCart');
addBtn.addEventListener('click', (event) => {
  event.preventDefault();
  addToLocalstoreage(productId);
});

// const prodAddToLocalstorage = (fetchProductData) => {
//   const addBtn = document.querySelector('#addToCart');

//   addBtn.addEventListener('click', (event) => {
//     event.preventDefault();
//     let prodColour = document.querySelector('#colors').value;
//     let prodQuantity = document.querySelector('#quantity').value;

//     let cartItemsLocal = localStorage.getItem('cartItems');

//     if (cartItemsLocal === null) {
//       console.log('+');

//       let aProduct = {
//         img: fetchProductData.imageUrl,
//         name: fetchProductData.name,
//         id: fetchProductData._id,
//         colour: prodColour,
//         quantity: prodQuantity,
//         price: fetchProductData.price,
//       };

//       localStorage.setItem('cartItems', JSON.stringify(aProduct));
//       console.log(aProduct);
//     } else {
//       // then get the existing cartItems from localStorage
//       // .getItems()
//       //
//       // Get IF localStorage product id equals fetchProductData product id, then update it's quantity
//       // you will need to use =+ operator for updating quantity
//       //
//       // Else if the colour is different use .setItem to create a new array item
//       //
//       // K.I.S.S
//     }
//   });
// };
