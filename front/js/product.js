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
    productAddToLocalstorage(data);
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
};

// add product to the localStorage
function productAddToLocalstorage(fetchProductData) {
  const addBtn = document.querySelector('#addToCart');

  addBtn.addEventListener('click', () => {
    let prodColour = document.querySelector('#colors').value;
    let prodQuantity = document.querySelector('#quantity').value;

    const myProd = {
      img: fetchProductData.imageUrl,
      name: fetchProductData.name,
      id: fetchProductData._id,
      colour: prodColour,
      quantity: prodQuantity,
    };

    localStorage.setItem('myProd', JSON.stringify(myProd));
    console.log(myProd);
  });
}
// console.log(Array.isArray(fetchProductData.colors));
