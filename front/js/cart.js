// add product to the localstorage
export function addToCart(product) {
  try {
    const productMap = JSON.parse(localStorage.getItem('cartItems'));

    const colour = document.querySelector('#colors').value;
    const quantity = parseInt(document.querySelector('#quantity').value);

    const newProduct = { ...product, colour, quantity };
    const productKey = product._id + colour;

    if (productMap[productKey]) {
      productMap[productKey].quantity = quantity;
    } else {
      productMap[productKey] = newProduct;
    }

    window.localStorage.setItem('cartItems', JSON.stringify(productMap));
  } catch (event) {
    console.error(event);
  }
}

//delete product from the cart
export function removeFromCart(product) {
  try {
    const productMap = JSON.parse(localStorage.getItem('cartItems'));

    const colour = document.querySelector('#colors').value;

    const productKey = product._id + colour;

    if (productMap[productKey]) {
      delete productMap[productKey];
    }

    window.localStorage.setItem('cartItems', JSON.stringify(productMap));
  } catch (event) {
    console.error(event);
  }
}

const itemsCartSection = document.querySelector('#cart__items');
const totalQuantity = document.querySelector('#totalQuantity');
const totalPrice = document.querySelector('#totalPrice');

const cartItemsLocal = JSON.parse(localStorage.getItem('cartItems')) || {};

// find unique key in the cart
const cartItems = Object.keys(cartItemsLocal).map((key) => cartItemsLocal[key]);

// add products to the cart (render)
cartItems.forEach((cartItem) => {
  let { id, imageUrl, name, colour, price, quantity } = cartItem;
  itemsCartSection.innerHTML += `<article class="cart__item" data-id="${id}" data-color="${cartItem.colour}">
                <div class="cart__item__img">
                  <img src="${imageUrl}" alt="Photo of a sofa">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${name}</h2>
                    <p>${colour}</p>
                    <p>${price}€</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Quantity : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem" data-key="">Delete</p>
                    </div>
                  </div>
                </div>
              </article>`;
});

const deleteItem = document.querySelector('.deleteItem');
deleteItem.addEventListener('click', (event) => {
  event.preventDefault();

  removeFromCart();
});
