import { Index } from "./index.js";
import { ContentArea } from "./content.js";

function Init() {
	this.index = new Index();
	this.content = new ContentArea();

	this.index.content = this.content;
	
	this.index.index = document.getElementById('index');
	this.content.titleDiv = document.getElementById('title');
	this.content.contentDiv = document.getElementById('content');
	this.content.errorDiv = document.getElementById('error');
}

Init.prototype.init = function() {
	this.index.init();
	this.content.init();
}

var init = new Init();

window.addEventListener('load', ev => init.init());
