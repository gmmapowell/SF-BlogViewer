import { ajax } from "./ajax.js";

function Index() {
	this.index = document.getElementById('index');
}

Index.prototype.init = function() {
	index.innerHTML = "<div>Post #1</div><div>Post #2</div>";
	ajax("/ajax/load-index", (stat, msg) => this.indexLoaded(stat, msg));
}

Index.prototype.indexLoaded = function(stat, msg) {
	msg = JSON.parse(msg);
	index.innerHTML = '';
	for (var f in msg.files) {
		console.log(f, msg.files[f]);
		this.makeIndexNode(msg.files[f]);
	} 
}

Index.prototype.makeIndexNode = function(name) {
	var e = document.createElement("div");
	e.className = 'index-entry';
	var tx = document.createTextNode(name);
	e.appendChild(tx);
	e.addEventListener('click', ev => this.entryClicked(name)); 
	index.appendChild(e);
}

Index.prototype.entryClicked = function(name) {
	console.log("clicked on", name);
}

export { Index };