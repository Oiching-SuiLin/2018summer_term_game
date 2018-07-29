var Loader = laya.net.Loader;
var Handler = laya.utils.Handler;
var WebGL = laya.webgl.WebGL;

var x = 0;
var y = 0;
var RN = 4;
var CN = 4;
var score = 0;
var state = 1;
var movex = 0;
var movey = 0;
var RUNNING = 1;
var data = null;
var GAMEOVER = 0;
var gamebox = null;

function changeboxcolor ( i, j ){
	if ( data[i][j] === 2 ){
		gamebox[i][j].color = "#776e65";
		gamebox[i][j].bgColor = "#eee3da";
	}
	else if ( data[i][j] === 4 ){
		gamebox[i][j].color = "#776e65";
		gamebox[i][j].bgColor = "#ede0c8";
	}
	else if ( data[i][j] === 8 ){
		gamebox[i][j].bgColor = "#f2b179";
	}
	else if ( data[i][j] === 16 ){
		gamebox[i][j].bgColor = "#f59563";
	}
	else if ( data[i][j] === 32 ){
		gamebox[i][j].bgColor = "#f67c5f";
	}
	else if ( data[i][j] === 64 ){
		gamebox[i][j].bgColor = "#f65e3b";
	}
	else if ( data[i][j] === 128 ){
		gamebox[i][j].bgColor = "#edcf72";
	}
	else if ( data[i][j] === 256 ){
		gamebox[i][j].bgColor = "#edcc61";
	}
	else if ( data[i][j] === 512 ){
		gamebox[i][j].bgColor = "#9c0";
	}
	else if ( data[i][j] === 1024 ){
		gamebox[i][j].bgColor = "#33b5e5";
	}
	else if ( data[i][j] === 2048 ){
		gamebox[i][j].bgColor = "#09c";
	}
	else if ( data[i][j] === 4096 ){
		gamebox[i][j].bgColor = "#a6c";
	}
} 

function randomNum(){
	while ( 1 )
	{
		var i = Math.floor(Math.random() * RN);
		var j = Math.floor(Math.random() * CN);
		if ( data[i][j] === 0 ){
			data[i][j] = Math.random() < 0.6 ? 2 : 4;
			break;			
		}
	}
}

function updataView(){
	for ( var i = 0; i < RN; i++ ){
		for ( var j = 0; j < CN; j++ ){
			if ( data[i][j] !== 0 )
			{
				gamebox[i][j].text = data[i][j];
				changeboxcolor(i, j);
			}
			else
			{
				gamebox[i][j].text = "";
				gamebox[i][j].bgColor = "#ccc0b3";
			}
		}
	}
	Testui.score.text = "分数：" + score;
	if ( state === GAMEOVER ){
		Testui.stop.visible = false;
		Testui.score.visible = false;
		Testui.box2.visible = true;
		Testui.gamescore.visible = true;
		Testui.gamescore.text = "你最后的分数为：" + score;
		Testui.gamescore.fontSize = 30;
	}
}

function isGameOver(){
	for ( var i = 0; i < RN; i++ ){
		for ( var j = 0; j < CN; j++ ){
			if ( data[i][j] === 0 ||
			 j < CN-1 
			 && data[i][j] === data[i][j+1] ||
			 i < RN-1
			 && data[i][j] === data[i+1][j] ){
				 return false;
			 }
		}
	}
	return true;
}

function moveUp(){
	var before = String(data);
	for ( var i = 0; i < RN; i++ ){
		moveUpInRow(i);
	}
	var after = String(data);
	if ( after !== before ){
		randomNum();
		isGameOver() && ( state = GAMEOVER );
		updataView();
	}
}

function getNextInRow(n1, n2){
	for ( var i = n2 + 1; i < CN; i++ ){
		if ( data[n1][i] !== 0 ){
			return i;
		}
	}
	return -1;
}

function moveUpInRow(num){
	for ( var i = 0; i < CN - 1; i++ ){
		var nexti = getNextInRow(num, i);
		if ( nexti === -1 ){
			break;
		}
		else{
			if ( data[num][i] === 0 ){
				data[num][i] = data[num][nexti];
				data[num][nexti] = 0;
				i--;
				updataView();
			}
			else if ( data[num][i] === data[num][nexti] ){
				data[num][i] *= 2;
				score += data[num][i];
				data[num][nexti] = 0;
			}
		}
	}
}

function change1(){
	for ( var i = 0; i < 4; i++ ){
		for ( var j = 0; j < 2; j++ ){
			var temp = data[i][j];
			data[i][j] = data[i][3-j];
			data[i][3-j] = temp;
		}
	}
}

function change2(){
	for ( var i = 0; i < 4; i++ ){
		for ( var j = i + 1; j < 4; j++ ){
			var temp = data[i][j];
			data[i][j] = data[j][i];
			data[j][i] = temp;
		}
	}
}

function moveDown(){
	change1();
	moveUp();
	change1();
	updataView();
}

function moveLeft(){
	change2();
	moveUp();
	change2();
	updataView();
}

function moveRight(){
	change2();
	moveDown();
	change2();
	updataView();
}

function onMouseDown(){
	movex = Laya.stage.mouseX;
	movey = Laya.stage.mouseY;
}

function onMouseUp(){
	x = Laya.stage.mouseX;
	y = Laya.stage.mouseY;
	var x1 = x - movex;
	var y1 = y - movey;
	x = Math.abs ( x - movex );
	y = Math.abs ( y - movey );
	if ( x > y && y < 100 && state === RUNNING ){
		if ( x1 < -30){
			moveLeft();
		}
		else if ( x1 > 30 ){
			moveRight();
		}
	}
	else if ( y > x && x < 100 && state === RUNNING ){
		if ( y1 < -30 ){
			moveUp();
		}
		else if ( y1 > 30 ){
			moveDown();
		}
	}
	updataView();
}

function TestUI()
{
	var Event = laya.events.Event;
	TestUI.super(this);
	this.box.on(Event.MOUSE_UP, this, onMouseUp);
	this.stop.on(Event.CLICK, this, onstopClick);
	this.again.on(Event.CLICK, this, onagainClick);
	this.turn1.on(Event.CLICK, this, onturn1Click);
	this.turn2.on(Event.CLICK, this, onturn2Click);
	this.box.on(Event.MOUSE_DOWN, this, onMouseDown);
	this.gamestart.on(Event.CLICK, this, ongamestartClick);

	function ongamestartClick()
	{
		this.titile1.visible = false;
		this.titile2.visible = false;
		this.titile3.visible = false;
		this.titile4.visible = false;
		this.gamestart.visible = false;
		this.box.visible = true;
		this.stop.visible = true;
		this.score.visible = true;
		score = 0;
		data = [];
		gamebox = [];
		state = RUNNING;
		for ( var i = 0; i < RN; i++ )
		{
			data[i] = new Array( CN );
			for ( var j = 0; j < CN; j++ )
			{
				data[i][j] = 0;
			}
		}
		for ( var i = 0; i < RN; i++ )
		{
			gamebox[i] = new Array( CN );
			for ( var j = 0; j < CN; j++ )
			{
				gamebox[i][j] = new Laya.Label;
				gamebox[i][j].text = 0;
				gamebox[i][j].x = i * 100;
				gamebox[i][j].y = j * 100;
				gamebox[i][j].width = 100;
				gamebox[i][j].height = 100;
				gamebox[i][j].fontSize = 60;
				gamebox[i][j].color = "#fff";
				gamebox[i][j].align = "center";
				gamebox[i][j].bgColor = "#ccc0b3";
				this.box.addChild(gamebox[i][j]);
			}
		}
		randomNum();
		randomNum();
		updataView();
	}

	function onagainClick(){
		this.box2.visible = false;
		this.turn2.visible = false;
		this.gamescore.visible = false;
		this.box.visible = true;
		this.stop.visible = true;
		this.score.visible = true;
		score = 0;
		state = RUNNING;
		for ( var i = 0; i < RN; i++ )
		{
			for ( var j = 0; j < CN; j++ )
			{
				data[i][j] = 0;
			}
		}
		randomNum();
		randomNum();
		updataView();
	}

	function onstopClick(){
		this.box.visible = false;
		this.stop.visible = false;
		this.score.visible = false;
		this.box2.visible = true;
		this.turn2.visible = true;
	}

	function onturn1Click(){
		this.box.visible = false;
		this.box2.visible = false;
		this.turn2.visible = false;
		this.gamescore.visible = false;
		this.titile1.visible = true;
		this.titile2.visible = true;
		this.titile3.visible = true;
		this.titile4.visible = true;
		this.gamestart.visible = true;
		for ( var i = 0; i < RN; i++ )
		{
			for ( var j = 0; j < CN; j++ )
			{
				data[i][j] = 0;
			}
		}
	}

	function onturn2Click(){
		this.box2.visible = false;
		this.turn2.visible = false;
		this.box.visible = true;
		this.score.visible = true;
		this.stop.visible = true;
	}
}

Laya.class(TestUI, "TestUI", TestPageUI);

Laya.MiniAdpter.init();

Laya.init(400, 500, WebGL);

Laya.ResourceVersion.enable("version.json", Handler.create(null, beginLoad), Laya.ResourceVersion.FILENAME_VERSION);

function beginLoad(){
	Laya.loader.load("res/atlas/comp.atlas", Handler.create(null, onLoaded));
	Laya.loader.load("res/music.mp3", Handler.create(null, onmusic));
}

var Testui;

function onLoaded(){
	Testui = new TestUI();
	Laya.stage.addChild(Testui);
}

function onmusic(){
	Laya.SoundManager.playMusic( "res/music.mp3", 0 );
}