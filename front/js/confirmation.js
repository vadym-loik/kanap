function showOrderId() {
  const orderId = document.querySelector('#orderId');

  orderId.textContent = localStorage.orderId;

  localStorage.clear();
}
showOrderId();
