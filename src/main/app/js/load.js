import { ajax } from "./ajax.js";

function Init() {
	this.index = document.getElementById('index');
	this.content = document.getElementById('content');
}

Init.prototype.init = function() {
	index.innerHTML = "<div>Post #1</div><div>Post #2</div>";
	ajax("/ajax/load-index", (stat, msg) => this.indexLoaded(stat, msg));
	
	content.innerHTML = "hello, world";
	content.className = 'bold';
}

Init.prototype.indexLoaded = function(stat, msg) {
	msg = JSON.parse(msg);
	index.innerHTML = '';
	for (var f in msg.files) {
		console.log(f, msg.files[f]);
		this.makeIndexNode(msg.files[f]);
	} 
}

Init.prototype.makeIndexNode = function(name) {
	var e = document.createElement("div");
	e.className = 'index-entry';
	var tx = document.createTextNode(name);
	e.appendChild(tx);
	e.addEventListener('click', ev => this.entryClicked(name)); 
	index.appendChild(e);
}

Init.prototype.entryClicked = function(name) {
	console.log("clicked on", name);
}

var init = new Init();

window.addEventListener('load', ev => init.init());
