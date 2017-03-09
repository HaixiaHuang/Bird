(function(Fly) {
var Game = function( id ) {
	this.cv = Fly.createCV( id );
	this.ctx = this.cv.getContext('2d');
	this.isStart = true;
	this.roleList = [];
	this.hero = null;
	this.imgSrc = ['birds', 'land', 'sky', 'pipe1', 'pipe2'];
	this.lastFrameTime = new Date();
	this.curFrameTime = 0;
};
Game.prototype = {
	constructor: Game,
	// 开始游戏
	startGame: function() {
		var that = this;
		Fly.loadImages(this.imgSrc, function( imgList ) {	
			that.initRoles( imgList );		
			that.bindEvent();
			that.draw(imgList);
		});
	},
	// 结束游戏
	stopGame: function() {
		this.isStart = false;
	},
	initRoles: function( imgList ) {
    this.hero = new Fly.Bird({
    	ctx: this.ctx,
    	img: imgList.birds
    });
    for(var i = 0; i < 2; i++) {
      this.roleList.push(
      	new Fly.Sky({
	      	ctx: this.ctx,
	      	img: imgList.sky,
	      	x: imgList.sky.width * i
	      })
      );
    }
    for(var i = 0; i < 6; i++) {
    	this.roleList.push(
    		new Fly.Pipe({
    			ctx: this.ctx,
    			imgDown: imgList.pipe1,
    			imgUp: imgList.pipe2,
    			x: i * imgList.pipe1.width * 3 + 300
    		})
    	)
    }
    for(var i = 0; i < 4; i++) {
    	this.roleList.push(
    		new Fly.Land({
    			ctx: this.ctx,
    			img: imgList.land,
    			x: i * imgList.land.width,
    			y: this.cv.height - imgList.land.height
    		})
    	);
    }
	},
	draw: function( imgList ) {
		var that = this;
		var render = function() {	 
			that.curFrameTime = new Date();	   
			var delta = that.curFrameTime - that.lastFrameTime;
			that.lastFrameTime = that.curFrameTime;	
			that.ctx.beginPath(); 
			that.ctx.clearRect(0, 0, cv.width, cv.height);
	    that.ctx.save();
	    that.roleList.forEach(function( role ) {
	    	role.draw( delta );
	    });
	   	that.hero.draw( delta );
	   	if(that.hero.y <= 0 || (that.hero.y >= that.cv.height - imgList.land.height) || that.ctx.isPointInPath(that.hero.x, that.hero.y)) {

	   		that.isStart = false;
	   	}
	    that.ctx.restore();
	    if(that.isStart) {
	  		window.requestAnimationFrame( render );
	    }
		};
		window.requestAnimationFrame( render );
	},
	bindEvent: function() {
		var that = this;
  	that.cv.addEventListener('click', function() {
  		that.hero.changeSpeed( -0.3 );
  	});
	}
};
Fly.Game = Game;
})(Fly);