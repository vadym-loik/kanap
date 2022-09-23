const queryString = window.location.search;
console.log(queryString);

const urlParams = new URLSearchParams(queryString);
console.log(urlParams.has('id'));

const productId = urlParams.get('id');
console.log(productId);

fetch(`http://localhost:3000/api/products/${productId}`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    renderProduct(data, document);
    console.log(data);
  })
  .catch((error) => {
    console.log('Error ' + error);
  });

const renderProduct = (fetchProductData, document) => {
  document.querySelector('.item__img').innerHTML =
    '<img class="prodImg" src="' +
    fetchProductData.imageUrl +
    '" alt="Kanap company logo">';
  document.querySelector('#title').innerText = fetchProductData.name;
  document.querySelector('#price').innerText = fetchProductData.price;
  document.querySelector('#description').innerText =
    fetchProductData.description;
  fetchProductData.colors.forEach((color) => {
    document.querySelector('#colors').innerHTML +=
      '<option value="' + color + ' "> ' + color + ' </option>';
  });
  console.log(Array.isArray(fetchProductData.colors));
};
