let dataFromLocalstorage = localStorage.getItem('myProd');
dataFromLocalstorage = JSON.parse(dataFromLocalstorage);

const itemsCartSection = document.querySelector('#cart__items');
