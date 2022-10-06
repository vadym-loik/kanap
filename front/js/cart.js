const itemsCartSection = document.querySelector('#cart__items');
const totalQuantity = document.querySelector('#totalQuantity');
const totalPrice = document.querySelector('#totalPrice');
const deleteItem = document.querySelector('.deleteItem');

let dataFromLocalstorage = localStorage.getItem('myProd');
dataFromLocalstorage = JSON.parse(dataFromLocalstorage);

itemsCartSection.innerHTML += `<article class="cart__item" data-id="${dataFromLocalstorage.id}" data-color="${dataFromLocalstorage.colour}">
                <div class="cart__item__img">
                  <img src="${dataFromLocalstorage.img}" alt="Photo of a sofa">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${dataFromLocalstorage.titleName}</h2>
                    <p>Colour : ${dataFromLocalstorage.colour}</p>
                    <p>Price : ${dataFromLocalstorage.price}€</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Quantity : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${dataFromLocalstorage.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Delete</p>
                    </div>
                  </div>
                </div>
              </article>`;

const sumTotalQuantity = () => {};

const sumTotalPrice = () => {};
