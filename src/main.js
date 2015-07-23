var Pixi = require('pixi.js'), Key = require('./Key.js'), HubLoad = require('./HubLoad.js'), HubMain = require('./HubMain.js'), HubGame = require('./HubGame.js');

var renderer, input, loader, state, updateDelta, lastUpdate, rootStage, hubLoad, hubMain, hubGame;

window.onload = function(){
	renderer = Pixi.autoDetectRenderer(800, 600);
	document.body.appendChild(renderer.view);
	input = new Pixi.interaction.InteractionManager(renderer);
	input.keys = {up:new Key(38), down:new Key(40)};
	loader = new Pixi.loaders.Loader('./')
	
	rootStage = new Pixi.Container();
	state = 'preload';
	
	hubLoad = new HubLoad(loader);
	hubMain = new HubMain(loader);
	hubGame = new HubGame(loader);
	
	var updatesPerSecond = 40;
	updateDelta = 1000 / updatesPerSecond;
	lastUpdate = 0;
	
	requestAnimationFrame(run);
}

function render(){
	renderer.render(rootStage);
}

function update(){
	switch(state){
		case 'preload':
			if(hubLoad.loaded){
				startLoad();
			}
		break;
		
		case 'load':
			progress = (hubGame.loadPercent + hubMain.loadPercent) / 2;
			if(progress >= 100){
				endLoad();
				startMain();
			}else{
				hubLoad.updateProgress();
			}
		break;
		
		case 'main':
			if(hubMain.toPlay){
				endMain();
				startGame();
			}
		break;
		
		case 'game':
		
		break;
		
		case 'none':
			throw 'No State During Update';
		break;
		
		default:
	}
}

function run(timestamp){
	while(lastUpdate < timestamp){
		lastUpdate += updateDelta;
		update();
	}
	render();
	
	requestAnimationFrame(run);
}

function startLoad(){
	state = 'load';
	rootStage.addChild(hubLoad.stage);
	console.log('Start Load');
}

function endLoad(){
	state = 'none';
	rootStage.removeChild(hubLoad.stage);
	console.log('End Load');
}

function startMain(){
	state = 'main';
	rootStage.addChild(hubMain.stage);
	console.log('Start Main');
}

function endMain(){
	state = 'none';
	rootStage.removeChild(hubMain.stage);
	console.log('End Main');
}

function startGame(){
	state = 'game';
	rootStage.addChild(hubGame.stage);
	console.log('Start Game');
}

function endGame(){
	state = 'none';
	rootStage.removeChild(hubGame.stage);
	console.log('End Game');
}
