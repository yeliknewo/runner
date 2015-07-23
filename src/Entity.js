var Pixi = require('Pixi.js'), Const = require('./Const.js');

function Entity(type, textures){
	this.stage = new Pixi.Container();
	
	this.sprite = new Pixi.Sprite(textures[Const.types[type]].texture);
	this.sprite.anchor.set(0.5, 0.5);
	this.stage.addChild(this.sprite);
	
	if(Const.types[type] == 'gamePlayer'){
		this.moves = false;
	}else{
		this.moves = true;
	}
}

module.exports = Entity;
