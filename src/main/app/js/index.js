import { ajax } from "./ajax.js";

function Index() {
	this.index = null; // new ElementWithId("content");
}

Index.prototype.init = function() {
	this.reloadIndex(false);
}

Index.prototype.reloadIndex = function(force) {
	this.index.innerHTML = "Loading...";
	var str = "";
	if (force)
		str = "?force=1";
	ajax("/ajax/load-index" + str, (stat, msg) => this.indexLoaded(stat, msg));
}

Index.prototype.indexLoaded = function(stat, msg) {
	msg = JSON.parse(msg);
	index.innerHTML = '';
	for (var f in msg.files) {
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
	this.content.load(name);
}

export { Index };