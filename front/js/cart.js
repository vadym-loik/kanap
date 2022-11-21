/*************** CART ***************/
// const button = document.querySelector('#order');
// button.disabled = true;

// find unique key in the cart object
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
    console.log(productMap[id]);
    if (productMap[id]) {
      delete productMap[id];
    }

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
  // console.log(productMap);
  const cartItemKeys = Object.keys(productMap);
  // console.log(cartItemKeys);

  cartItemKeys.forEach((productKey, i) => {
    inputBtn[i].addEventListener('change', (event) => {
      event.preventDefault();

      const modifiedValue = parseInt(inputBtn[i].value);
      // console.log(modifiedValue);

      if (modifiedValue) {
        productMap[productKey].quantity = modifiedValue;

        window.localStorage.setItem('cartItems', JSON.stringify(productMap));
        getTotalQuantity();
        // console.log(localStorage);
      }
    });
  });
};
changeQuantity();

/***********************FORM **********************/

// Regular Expressions
const nameFirstLastRegExp = new RegExp(`^[A-Za-z- ]+$`);
const adressRegExp = new RegExp(
  `^[a-zA-Zàâäéèêëïîôöùûüç0-9-,'.; ]{2,70}$`,
  `g`
);
const cityRegExp = new RegExp(`^[a-zA-Zàâäéèêëïîôöùûüç0-9 ]{2,31}$`, `g`);
const emailRegExp = new RegExp(`^[A-Za-z0-9+_.-]+@(.+)$`, `g`);

const form = document.querySelector('.cart__order__form');
const inputFirstName = document.querySelector('#firstName');
const inputLastName = document.querySelector('#lastName');
const inputAddress = document.querySelector('#address');
const inputCity = document.querySelector('#city');
const inputEmail = document.querySelector('#email');

// get the data from the form
function getFormData() {
  // validations of the inputs
  function firstNameValidation(firstName) {
    const testFirstName = nameFirstLastRegExp.test(firstName.value);

    if (testFirstName === true) {
      firstNameErrorMsg.textContent = '';
    } else {
      firstNameErrorMsg.textContent = 'The first name is not valid!';
      return true;
    }
  }

  function lastNameValidation(lastName) {
    const testLastName = nameFirstLastRegExp.test(lastName.value);

    if (testLastName === true) {
      lastNameErrorMsg.textContent = '';
    } else {
      lastNameErrorMsg.textContent = 'The last name is not valid!';
      return true;
    }
  }

  function addressValidation(address) {
    const testAddress = adressRegExp.test(address.value);

    if (testAddress === true) {
      addressErrorMsg.textContent = '';
    } else {
      addressErrorMsg.textContent = 'The address is not valid!';
      return true;
    }
  }

  function cityValidation(city) {
    const testCity = cityRegExp.test(city.value);

    if (testCity === true) {
      cityErrorMsg.textContent = '';
    } else {
      cityErrorMsg.textContent = 'The city is not valid!';
      return true;
    }
  }

  function emailValidation(email) {
    const testEmail = emailRegExp.test(email.value);

    if (testEmail === true) {
      emailErrorMsg.textContent = '';
    } else {
      emailErrorMsg.textContent = 'The e-mail is not valid!';
      return true;
    }
  }

  // event listeners for inputs
  form.firstName.addEventListener('change', function () {
    firstNameValidation(this);
    // console.log(this);
  });
  form.lastName.addEventListener('change', function () {
    lastNameValidation(this);
  });
  form.address.addEventListener('change', function () {
    addressValidation(this);
  });
  form.city.addEventListener('change', function () {
    cityValidation(this);
  });
  form.email.addEventListener('change', function () {
    emailValidation(this);
  });
}
getFormData();

// post data from the form to the API
function postFormData() {
  const orderBtn = document.querySelector('#order');

  // listener for the order button
  orderBtn.addEventListener('click', (event) => {
    event.preventDefault();

    if (
      inputFirstName.value == '' ||
      inputLastName.value == '' ||
      inputAddress.value == '' ||
      inputCity.value == '' ||
      inputEmail.value == ''
    ) {
      alert('Please fill in all fields!');
    }
    // else if () {}
    else {
      // button.disabled = false;
      // creat an array for data form
      const productsId = [];
      const productMap = JSON.parse(localStorage.getItem('cartItems'));
      console.log(productMap);

      const idsProducts = Object.keys(productMap).map(
        (productKey) => productMap[productKey]._id
      );
      console.log(idsProducts);

      idsProducts.forEach((_id) => {
        productsId.push(_id);
      });

      const order = {
        contact: {
          firstName: inputFirstName.value,
          lastName: inputLastName.value,
          address: inputAddress.value,
          city: inputCity.value,
          email: inputEmail.value,
        },
        products: productsId,
      };
      console.log(order);

      const options = {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(order),
      };
      console.log(options);

      fetch('http://localhost:3000/api/products/order', options)
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data);
          localStorage.clear();

          window.location.href = 'confirmation.html?orderId=' + data.orderId;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });
}
postFormData();
