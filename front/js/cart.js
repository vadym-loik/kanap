const itemsCartSection = document.querySelector('#cart__items');

// find unique key in the cart object
function getCartItems() {
  const cartItemsLocal = JSON.parse(localStorage.getItem('cartItems')) || {};
  return Object.keys(cartItemsLocal).map((key) => cartItemsLocal[key]);
}

//render products on the cart page
const renderProductCart = (cartItems) => {
  itemsCartSection.innerHTML = '';
  cartItems.forEach((cartItem) => {
    const datakey = cartItem._id + cartItem.colour;
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
                    <p class="deleteItem" data-key="${datakey}">Delete</p>
                  </div>
                </div>
              </div>
            </article>`;

    const deleteItems = document.querySelectorAll('.deleteItem');
    deleteItems.forEach((deleteBtn) => {
      addDeleteEventlistener(deleteBtn);
    });

    // sdelat' tut forEach dlya changeQuantity
  });
};
renderProductCart(getCartItems());

function addDeleteEventlistener(deleteItem) {
  return deleteItem.addEventListener('click', (event) => {
    const productId = event.target.dataset.key;

    removeFromCart(productId);
  });
}

//remove product from the cart function
function removeFromCart(id) {
  try {
    const productMap = JSON.parse(localStorage.getItem('cartItems'));
    // console.log(productMap);

    if (productMap[id]) {
      delete productMap[id];
    }

    window.localStorage.setItem('cartItems', JSON.stringify(productMap));
    renderProductCart(getCartItems());
  } catch (event) {
    console.error(event);
  }
}

// calculate the total quantity of the articles and total price
const getTotalQuantity = () => {
  let totalQuantity = 0;
  let totalPrice = 0;
  const cartItems = getCartItems();
  for (let i = 0; i < cartItems.length; i++) {
    let value = cartItems[i].quantity;
    totalQuantity += parseInt(value);
    let item = cartItems[i].price;
    totalPrice += parseInt(item) * cartItems[i].quantity;
  }
  document.querySelector('#totalQuantity').innerHTML = totalQuantity;
  document.querySelector('#totalPrice').innerHTML = totalPrice;
};

// change quantity function
const changeQuantity = () => {
  const inputBtn = document.querySelectorAll('.itemQuantity');
  const cartItems = getCartItems();
  for (let i = 0; i < cartItems.length; i++) {
    inputBtn[i].addEventListener('change', (event) => {
      event.preventDefault();

      let modifiedValue = inputBtn[i].value;
      console.log(modifiedValue);

      if (modifiedValue > 0 && modifiedValue <= 100) {
        cartItems[i].quantity = modifiedValue;
        window.localStorage.setItem('cartItems', JSON.stringify(cartItems));
      }
    });
  }

  getTotalQuantity();
};
changeQuantity();
