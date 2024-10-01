import { ajax } from "./ajax.js";

function ContentArea() {
	this.contentDiv = null; // new ElementWithId("content");
	this.errorDiv = null; // new ElementWithId("error");
}

ContentArea.prototype.init = function() {
	this.contentDiv.innerHTML = "";
}

ContentArea.prototype.load = function(name) {
	console.log("load", name);
	this.contentDiv.innerHTML = "";
	ajax("/ajax/format?post=" + encodeURIComponent(name), (stat, msg) => this.postLoaded(stat, msg));
}

ContentArea.prototype.postLoaded = function(stat, msg) {
	console.log("loaded", stat);
	if (stat == 200) {
		this.contentDiv.innerHTML = msg;
		this.contentDiv.className = 'blog-content';
		this.errorDiv.className = 'hidden';
	} else {
		this.errorDiv.innerHTML = msg;
		this.errorDiv.className = 'show-error';
		this.contentDiv.className = 'hidden';
	}
}

export { ContentArea };