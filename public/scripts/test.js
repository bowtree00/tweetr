function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

var myString = '<header><img class="avatar" src="/images/bill.jpg"><h2>Bill Fields</h2><div>@MrFields</div></header>';

console.log(escape(myString));