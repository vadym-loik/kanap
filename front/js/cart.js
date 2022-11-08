/*************** CART ***************/
// find unique key in the cart object

// console.log(cartItemsLocal);

function getCartItems() {
  const cartItemsLocal = JSON.parse(localStorage.getItem('cartItems')) || {};
  return Object.keys(cartItemsLocal).map((key) => cartItemsLocal[key]);
}

//render products on the cart page
const renderProductCart = (cartItems) => {
  const itemsCartSection = document.querySelector('#cart__items');
  itemsCartSection.innerHTML = '';
  cartItems.forEach((item) => {
    const datakey = item._id + item.colour;
    itemsCartSection.innerHTML += `<article class="cart__item" data-id="${item.id}" data-color="${item.colour}">
              <div class="cart__item__img">
                <img src="${item.imageUrl}" alt="Photo of a sofa">
              </div>
              <div class="cart__item__content">
                <div class="cart__item__content__description">
                  <h2>${item.name}</h2>
                  <p>${item.colour}</p>
                  <p>${item.price}€</p>
                </div>
                <div class="cart__item__content__settings">
                  <div class="cart__item__content__settings__quantity">
                    <p>Quantity : </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${item.quantity}">
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
  });
};
renderProductCart(getCartItems());

function addDeleteEventlistener(deleteItem) {
  return deleteItem.addEventListener('click', (event) => {
    const productId = event.target.dataset.key;

    removeFromCart(productId);
    // console.log(productId);
  });
}

//remove product from the cart function
function removeFromCart(id) {
  try {
    const productMap = JSON.parse(localStorage.getItem('cartItems'));

    if (productMap[id]) {
      delete productMap[id];
    }
    // console.log(productMap[id]);

    window.localStorage.setItem('cartItems', JSON.stringify(productMap));
    renderProductCart(getCartItems());
  } catch (event) {
    console.error(event);
  }
  getTotalQuantity();
}

// calculate the total quantity of the articles and total price
function getTotalQuantity() {
  const cartItems = getCartItems();
  const totalQuantity = cartItems.reduce(
    (totalQuantity, item) => totalQuantity + parseInt(item.quantity),
    0
  );

  const totalPrice = cartItems.reduce(
    (totalPrice, item) =>
      totalPrice + parseInt(item.price) * parseInt(item.quantity),
    0
  );

  document.querySelector('#totalQuantity').textContent = totalQuantity;
  document.querySelector('#totalPrice').textContent = totalPrice;
}
getTotalQuantity();

// change quantity function
const changeQuantity = () => {
  const inputBtn = document.querySelectorAll('.itemQuantity');
  const productMap = JSON.parse(localStorage.getItem('cartItems'));
  const cartItemKeys = Object.keys(productMap);

  cartItemKeys.forEach((productKey, i) => {
    inputBtn[i].addEventListener('change', (event) => {
      event.preventDefault();

      const modifiedValue = parseInt(inputBtn[i].value);
      console.log(modifiedValue);

      if (modifiedValue > 0 && modifiedValue <= 100) {
        productMap[productKey].quantity = modifiedValue;

        window.localStorage.setItem('cartItems', JSON.stringify(productMap));
        getTotalQuantity();
      }
    });
  });
};
changeQuantity();

// program to validate the email address

// function validateEmail(email) {

//     // regex pattern for email
//     const re = /\S+@\S+\.\S+/g;

//     // check if the email is valid
//     let result = re.test(email);
//     if (result) {
//         console.log('The email is valid.');
//     }
//     else {
//         let newEmail = prompt('Enter a valid email:');
//         validateEmail(newEmail);
//     }
// }

// // take input
// let email = prompt('Enter an email: ');

// validateEmail(email);
