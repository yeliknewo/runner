var Pixi = require('Pixi.js');

function HubGame(loader){
	this.loaded = false;
	this.loadPercent = 0;
	this.stage = new Pixi.Container();
	loader
	.add('gameBack', 'gameback.png')
	.on('load', this.onProgress.bind(this))
	.load(this.onLoad.bind(this));
	this.textures = loader.resources;
}

HubGame.prototype.onProgress = function(loader){
	this.loadPercent = loader.progress;
}

HubGame.prototype.onLoad = function(loader, resources){
	this.loaded = true;
	this.loadPercent = 100;
	
	this.back = new Pixi.Sprite(this.textures.gameBack.texture);
	this.stage.addChild(this.back);
}

module.exports = HubGame;
