function showOrderId() {
  const orderId = document.querySelector('#orderId');
  orderId.innerText = localStorage.getItem('orederId');
  //   localStorage.clear();
}
showOrderId();
