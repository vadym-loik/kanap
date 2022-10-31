const itemsCartSection = document.querySelector('#cart__items');

const totalPrice = document.querySelector('#totalPrice');

const cartItemsLocal = JSON.parse(localStorage.getItem('cartItems')) || {};

// find unique key in the cart object
const cartItems = Object.keys(cartItemsLocal).map((key) => cartItemsLocal[key]);

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

// calculate the total quantity of the articles and total price
const getTotalQuantity = async () => {
  const quantity = document.querySelectorAll('.itemQuantity');
  let totalQuantity = 0;
  for (let i = 0; i < quantity.length; i++) {
    let value = quantity[i].value;
    totalQuantity += parseInt(value);
  }
  document.querySelector('#totalQuantity').innerHTML = totalQuantity;

  // let totalPrice = 0;
  // for (let i = 0; i < cartItemsLocal.length; i++) {
  //   const productMap = JSON.parse(localStorage.getItem('cartItems'));
  //   let item = cartItemsLocal[i];
  //   productMap =

  // }
};

// add products to the cart (render)
cartItems.forEach((cartItem) => {
  if (itemsCartSection) {
    itemsCartSection.innerHTML += `<article class="cart__item" data-id="${
      cartItem.id
    }" data-color="${cartItem.colour}">
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
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${
                      cartItem.quantity
                    }">
                  </div>
                  <div class="cart__item__content__settings__delete">
                    <p class="deleteItem" data-key="${
                      cartItem._id + cartItem.colour
                    }">Delete</p>
                  </div>
                </div>
              </div>
            </article>`;
  }
  getTotalQuantity();
});

//remove product from the cart
function removeFromCart(id) {
  try {
    const productMap = JSON.parse(localStorage.getItem('cartItems'));

    if (productMap[id]) {
      delete productMap[id];
    }

    window.localStorage.setItem('cartItems', JSON.stringify(productMap));
  } catch (event) {
    console.error(event);
  }
}

// remove product from the cart
const deleteItem = document.querySelectorAll('.deleteItem');
deleteItem.forEach((deleteBtn) => {
  deleteBtn.addEventListener('click', (event) => {
    const productId = event.target.dataset.key;
    console.log(productId);
    removeFromCart(productId);
  });
});
