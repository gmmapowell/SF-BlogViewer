import { ajax } from "./ajax.js";

function ContentArea() {
	this.titleDiv = null; // new ElementWithId("title");
	this.contentDiv = null; // new ElementWithId("content");
	this.errorDiv = null; // new ElementWithId("error");
}

ContentArea.prototype.init = function() {
	this.titleDiv.innerHTML = "";
	this.contentDiv.innerHTML = "";
	this.errorDiv.innerHTML = "";
}

ContentArea.prototype.load = function(name) {
	console.log("load", name);
	this.titleDiv.innerHTML = "";
	this.contentDiv.innerHTML = "";
	this.errorDiv.innerHTML = "";
	ajax("/ajax/format?post=" + encodeURIComponent(name), (stat, msg) => this.postLoaded(stat, msg));
}

ContentArea.prototype.postLoaded = function(stat, msg) {
	console.log("loaded", stat);
	if (stat == 200) {
		this.titleDiv.innerHTML = "Blog Post";
		this.titleDiv.className = 'show-title';
		this.contentDiv.innerHTML = msg;
		this.contentDiv.className = 'blog-content';
		this.errorDiv.className = 'hidden';
	} else {
		this.titleDiv.innerHTML = "Error";
		this.titleDiv.className = 'show-error';
		this.errorDiv.innerHTML = msg;
		this.errorDiv.className = 'show-error';
		this.contentDiv.className = 'hidden';
	}
}

export { ContentArea };