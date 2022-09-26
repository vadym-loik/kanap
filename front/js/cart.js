let dataFromLocalstorage = localStorage.getItem('myProd');
dataFromLocalstorage = JSON.parse(dataFromLocalstorage);

const itemsCartSection = document.querySelector('#cart__items');

for (i = 0; i < dataFromLocalstorage.length; i += 1) {
  itemsCartSection.innerHTML += `<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
                <div class="cart__item__img">
                  <img src="../images/product01.jpg" alt="Photo of a sofa">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>Name of the product</h2>
                    <p>Green</p>
                    <p>€42.00</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Quantity : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Delete</p>
                    </div>
                  </div>
                </div>
              </article>
    `;
}

console.log(dataFromLocalstorage);
