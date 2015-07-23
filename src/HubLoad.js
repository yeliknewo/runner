var Pixi = require('Pixi.js');

function HubLoad(loader){
	this.loaded = false;
	this.loadPercent = 0;
	this.toMain = false;
	this.stage = new Pixi.Container();
	loader
	.add('loadBack', 'loadback.png')
	.on('load', this.onProgress.bind(this))
	.load(this.onLoad.bind(this));
	this.textures = loader.resources;
}

HubLoad.prototype.setupProgress = function(){
	this.back = new Pixi.Sprite(this.textures.loadBack.texture);
	this.stage.addChild(this.back);
	
	//Todo: Make Loading Screen
}

HubLoad.prototype.updateProgress = function(progress){
	console.log("Loading Progress: " + progress);
	
	if(progress >= 100){
		this.toMain = true;
	}
}

HubLoad.prototype.onProgress = function(loader){
	this.loadPercent = loader.progress;
}

HubLoad.prototype.onLoad = function(loader, resources){
	this.loaded = true;
	this.loadPercent = 100;
	this.setupProgress();
}

module.exports = HubLoad;
