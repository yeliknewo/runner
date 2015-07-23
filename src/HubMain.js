var Pixi = require('Pixi.js');

function HubMain(loader){
	this.loaded = false;
	this.loadPercent = 0;
	this.toGame = false;
	this.stage = new Pixi.Container();
	loader
	.add('mainBack', 'mainback.png')
	.add('mainPlayButton', 'mainplaybutton.png')
	.on('load', this.onProgress.bind(this))
	.load(this.onLoad.bind(this));
	this.textures = loader.resources;
}

HubMain.prototype.onProgress = function(loader){
	this.loadPercent = loader.progress;
}

HubMain.prototype.onLoad = function(loader, resources){
	this.loaded = true;
	this.loadPercent = 100;
	
	this.back = new Pixi.Sprite(this.textures.mainBack.texture);
	this.stage.addChild(this.back);
	
	this.playButton = new Pixi.Sprite(resources.mainPlayButton.texture);
	this.playButton.position.set(300, 300);
	this.playButton.interactive = true;
	this.playButton.mousedown = this.playClick.bind(this);
	this.stage.addChild(this.playButton);
}

HubMain.prototype.playClick = function(){
	this.toGame = true;
}

module.exports = HubMain;
