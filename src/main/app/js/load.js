import { Index } from "./index.js";

function Init() {
	this.index = new Index();
	this.content = document.getElementById('content');
}

Init.prototype.init = function() {
	this.index.init();
	
	content.innerHTML = "hello, world";
	content.className = 'bold';
}

var init = new Init();

window.addEventListener('load', ev => init.init());
