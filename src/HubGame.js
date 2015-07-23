var Pixi = require('Pixi.js'), Const = require('./Const.js'), Entity = require('./Entity.js');

function HubGame(loader){
	this.loaded = false;
	this.loadPercent = 0;
	this.stage = new Pixi.Container();
	loader
	.add('gameBack', 'gameback.png')
	.add('gamePlayer', 'gameplayer.png')
	.add('gameRock', 'gamerock.png')
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
	
	this.entities = [];
	this.addEntity(0, [300, 300]);
	this.player = this.entities[0];
	this.addEntity(1, [600, 400]);
	this.addEntity(1, [800, 200]);
	
	this.speedToRads = 1.0 / (this.player.stage.height / 2);
	this.speed = 0.0;
}

HubGame.prototype.update = function(input){
	this.player.stage.rotation += this.speed * this.speedToRads;
	this.speed += 1.0;
	this.speed *= 0.8;
	if(input.keys.down.isDown && !input.keys.up.isDown){
		this.player.stage.position.y += 1;
	}else if(input.keys.up.isDown && !input.keys.down.isDown){
		this.player.stage.position.y -= 1;
	}
	for(var i = 0; i < this.entities.length;i++){
		var e = this.entities[i];
		if(e.moves){
			e.stage.position.x -= this.speed;
		}
	}
	this.entities.sort(function(a,b){
		return a.stage.y - b.stage.y;
	});
	for(var i = 0;i < this.entities.length;i++){
		this.stage.setChildIndex(this.entities[i].stage, i + this.stage.children.length - this.entities.length);
	}
}

HubGame.prototype.addEntity = function(type, position){
	var temp = new Entity(type, this.textures);
	temp.stage.position.set(position[0], position[1]);
	this.stage.addChild(temp.stage);
	this.entities.push(temp);
}

module.exports = HubGame;
