let dataFromLocalstorage = localStorage.getItem('myProd');
dataFromLocalstorage = JSON.parse(dataFromLocalstorage);

const itemsCartSection = document.querySelector('#cart__items');

let totalPrice = [];
let totalQuantity = [];

for (i = 0; i < dataFromLocalstorage.length; i += 1) {
  itemsCartSection.innerHTML += `<article class="cart__item" data-id="${dataFromLocalstorage[i].id}" data-color="${dataFromLocalstorage[i].colour}">
                <div class="cart__item__img">
                  <img src="${dataFromLocalstorage[i].img}" alt="Photo of a sofa">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${dataFromLocalstorage[i].name}</h2>
                    <p>${dataFromLocalstorage[i].colour}</p>
                    <p>${dataFromLocalstorage[i].price} + "€"</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Quantity : ${dataFromLocalstorage[i].quantity}</p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Delete</p>
                    </div>
                  </div>
                </div>
              </article>
    `;

  let quantityNumber = parseInt(dataFromLocalstorage[i].quantity);
  let priceNumber = parseInt(
    productInLocalStorage[i].price * dataFromLocalstorage[i].quantity
  );

  totalQuantity.push(quantityNumber);
  totalPrice.push(priceNumber);
}

console.log(dataFromLocalstorage);
