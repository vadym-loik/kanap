// render orderId on the page using URL
function showOrderId() {
  const params = new URLSearchParams(window.location.search);
  const orderId = params.get('orderId');
  const renderId = document.querySelector('#orderId');

  renderId.textContent = orderId;
}
showOrderId();
