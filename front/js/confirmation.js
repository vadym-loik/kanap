// render orderId on the page
function showOrderId() {
  const params = new URLSearchParams(window.location.search);
  const orderId = params.get('orderId');
  const renderId = document.querySelector('#orderId');

  renderId.textContent = orderId;
}
showOrderId();
