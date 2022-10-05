//taking products from the API
const getProducts = fetch('http://localhost:3000/api/products')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    addProducts(data);
  })
  .catch((error) => {
    console.log('Error ' + error);
  });

//select the section with the identifier
const itemsSection = document.querySelector('#items');

//a function which goes through our array of objects and adds HTML markup to the DOM
function addProducts(articles) {
  for (let article of articles) {
    itemsSection.innerHTML += `
    <a href="./product.html?id=${article._id}">
      <article>
          <img src="${article.imageUrl}" alt="${article.altTxt}">
          <h3 class="productName">${article.name}</h3>
          <p class="productDescription">${article.description}</p>
      </article>
  </a>
    `;
  }
}
