var CLASS$=Laya.class;
var STATICATTR$=Laya.static;
var View=laya.ui.View;
var Dialog=laya.ui.Dialog;
var TestPageUI=(function(_super){
		function TestPageUI(){
			
		    this.gamestart=null;
		    this.titile4=null;
		    this.titile3=null;
		    this.titile2=null;
		    this.titile1=null;
		    this.score=null;
		    this.box=null;
		    this.stop=null;
		    this.gamescore=null;
		    this.box2=null;
		    this.again=null;
		    this.turn1=null;
		    this.turn2=null;

			TestPageUI.__super.call(this);
		}

		CLASS$(TestPageUI,'ui.test.TestPageUI',_super);
		var __proto__=TestPageUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(TestPageUI.uiView);

		}

		TestPageUI.uiView={"type":"View","props":{"y":0,"x":0,"width":400,"height":500},"child":[{"type":"Image","props":{"y":0,"x":0,"width":400,"skin":"comp/background.png","height":600}},{"type":"Button","props":{"y":250,"x":0,"width":400,"var":"gamestart","labelStroke":3,"labelSize":35,"label":"开始","height":100}},{"type":"Label","props":{"y":50,"x":315,"width":70,"var":"titile4","text":"8","height":200,"fontSize":80,"color":"#06D6A0"}},{"type":"Label","props":{"y":50,"x":230,"width":70,"var":"titile3","text":"4","height":200,"fontSize":80,"color":"#1B9AAA"}},{"type":"Label","props":{"y":50,"x":140,"width":70,"var":"titile2","text":"0","height":200,"fontSize":80,"color":"#EF476F"}},{"type":"Label","props":{"y":50,"x":50,"width":70,"var":"titile1","text":"2","height":200,"fontSize":80,"color":"#FFC43D"}},{"type":"Label","props":{"x":0,"width":200,"visible":false,"var":"score","top":20,"text":"分数：","fontSize":40,"color":"#080808","bold":true,"align":"center"}},{"type":"Box","props":{"y":100,"x":0,"width":400,"visible":false,"var":"box","height":400}},{"type":"Button","props":{"y":-10,"x":315,"width":100,"visible":false,"var":"stop","labelStroke":2,"labelSize":35,"labelAlign":"center","label":"暂停","height":100}},{"type":"Label","props":{"y":25,"x":0,"width":400,"visible":false,"var":"gamescore","text":"label","height":100,"fontSize":60,"color":"#010101","align":"center"}},{"type":"Box","props":{"y":0,"x":0,"width":400,"visible":false,"var":"box2","height":500},"child":[{"type":"Button","props":{"y":250,"x":0,"width":400,"visible":true,"var":"again","labelStroke":2,"labelSize":35,"labelAlign":"center","label":"再来一局","height":100}},{"type":"Button","props":{"y":350,"x":0,"width":400,"visible":true,"var":"turn1","labelStroke":2,"labelSize":35,"labelAlign":"center","label":"主菜单","height":100}}]},{"type":"Button","props":{"y":150,"x":0,"width":400,"visible":false,"var":"turn2","labelStroke":2,"labelSize":35,"labelAlign":"center","label":"回到游戏","height":100}}]};
		return TestPageUI;
	})(View);