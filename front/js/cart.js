const itemsCartSection = document.querySelector('#cart__items');
const totalQuantity = document.querySelector('#totalQuantity');
const totalPrice = document.querySelector('#totalPrice');
const deleteItem = document.querySelector('.deleteItem');

const cartItemsLocal = JSON.parse(localStorage.getItem('cartItems')) || [];

// aggregation (group products by id and colour)
// get all product ID
const productIds = cartItemsLocal.map((item) => item._id);

// delete duplicates
const uniqueProductIds = [...new Set(productIds)];

// prepare objects that will be displayed in the cart
const cartItems = uniqueProductIds.map((id) => {
  const productGroup = cartItemsLocal.filter((item) => {
    return item._id === id;
  });

  // [prodA, prodB, prodB] ---> [prodA, prodB]
  const aggregatedGroup = productGroup.map((product) => {
    // quntity sum of the product
    const quantity = productGroup.reduce(
      (acc, cur) => cur.prodQuantity + acc,
      0
    );

    return {
      id: product._id,
      name: product.name,
      colour: product.prodColour,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity,
    };
  });

  return aggregatedGroup[0];
});

console.log(cartItems);

// add products to the cart DOM
cartItems.forEach((cartItem) => {
  itemsCartSection.innerHTML += `<article class="cart__item" data-id="${cartItem.id}" data-color="${cartItem.colour}">
                <div class="cart__item__img">
                  <img src="${cartItem.imageUrl}" alt="Photo of a sofa">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${cartItem.name}</h2>
                    <p>${cartItem.colour}</p>
                    <p>${cartItem.price}€</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Quantity : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cartItem.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Delete</p>
                    </div>
                  </div>
                </div>
              </article>`;
});

// const sumTotalPrice = () => {};

// const deleteItemFn = () => {};
