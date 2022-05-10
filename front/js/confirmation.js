


let params = (new URL(document.location)).searchParams;
let id = params.get('order');
orderForCustomer = params.get('order')
document.getElementById("orderId").innerHTML = orderForCustomer

