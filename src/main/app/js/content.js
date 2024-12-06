import { ajax } from "./ajax.js";

function ContentArea() {
	this.titleDiv = null; // new ElementWithId("title");
	this.contentDiv = null; // new ElementWithId("content");
	this.errorDiv = null; // new ElementWithId("error");
}

ContentArea.prototype.init = function() {
	this.titleDiv.innerHTML = "";
	this.titleDiv.addEventListener('click', ev => this.reloadCurrent());
	this.contentDiv.innerHTML = "";
	this.errorDiv.innerHTML = "";
}

ContentArea.prototype.load = function(name) {
	this.currentPost = name;
	this.titleDiv.innerHTML = "";
	this.errorDiv.innerHTML = "";
	
	this.doload();
}

ContentArea.prototype.reloadCurrent = function() {
	this.doload(this.currentPost);
}

ContentArea.prototype.doload = function() {
	this.startScroll = this.contentDiv.scrollTop;
	console.log("scroll from", this.startScroll);
	this.contentDiv.innerHTML = "";
	ajax("/ajax/format?post=" + encodeURIComponent(this.currentPost), (stat, msg) => this.postLoaded(stat, msg));
}

ContentArea.prototype.postLoaded = function(stat, msg) {
	if (stat == 200) {
		this.titleDiv.innerHTML = this.currentPost;
		this.titleDiv.className = 'show-title';
		this.contentDiv.innerHTML = msg;
		this.contentDiv.className = 'blog-content';
		this.errorDiv.className = 'hidden';
		console.log("need to scroll from", this.startScroll);
		this.contentDiv.scrollTop = this.startScroll;
	} else {
		this.currentPost = null;
		this.titleDiv.innerHTML = "Error";
		this.titleDiv.className = 'show-error';
		this.errorDiv.innerHTML = msg;
		this.errorDiv.className = 'show-error';
		this.contentDiv.className = 'hidden';
	}
}

export { ContentArea };