let dataFromLocalstorage = localStorage.getItem('myProd');
dataFromLocalstorage = JSON.parse(dataFromLocalstorage);

const itemsCartSection = document.querySelector('#cart__items');

const myCartData = [];

console.log(myCartData);

function putDataToTheCard() {
  myCartData.push(dataFromLocalstorage);
  return myCartData;
}

putDataToTheCard();
