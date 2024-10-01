
function init() {
  var index = document.getElementById('index');
  index.innerHTML = "<div>Post #1</div><div>Post #2</div>";
//  content.className = 'bold';
  var content = document.getElementById('content');
  content.innerHTML = "hello, world";
  content.className = 'bold';
}

window.addEventListener('load', init);
