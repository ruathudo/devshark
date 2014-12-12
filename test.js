/**
 * Define an object to hold all our images for the game so images
 * are only ever created once. This type of object is known as a
 * singleton.
 */
var imageRepository = new function() {
	// Define images
	this.background = new Image();
	this.point = new Image();
	//Ensure all images have loaded before starting the game
	var numImages = 2;
	var numLoaded = 0;
	function imageLoaded(){
		numLoaded++;
		if(numLoaded === numImages){
			window.init();
		}
	}
	this.background.onload = function(){
		imageLoaded();
	}
	this.point.onload = function(){
		imageLoaded();
	}
	// Set images src
	this.background.src = "imgs/bg.jpg";
	this.point.src="imgs/point.jpg";
}
/**
 * Creates the Drawable object which will be the base class for
 * all drawable objects in the game. Sets up default variables
 * that all child objects will inherit, as well as the default
 * functions.
 */
function Drawable() {
	this.init = function(x, y) {
		// Default variables
		this.x = x;
		this.y = y;
	}
	this.speed = 0;
	this.canvasWidth = 0;
	this.canvasHeight = 0;
	// Define abstract function to be implemented in child objects
	this.draw = function() {
	};
}
/**
 * Creates the Background object which will become a child of
 * the Drawable object. The background is drawn on the "background"
 * canvas and creates the illusion of moving by panning the image.
 */
function Background() {
	this.draw = function() {
		// Pan background
		this.context.drawImage(imageRepository.background, this.x, this.y);

	};
}
// Set Background to inherit properties from Drawable
Background.prototype = new Drawable();
/*
 * Game Object
 */
function Game(){
		/*
	 * Gets canvas information and context and sets up all game
	 * objects.
	 * Returns true if the canvas is supported and false if it
	 * is not. This is to stop the animation script from constantly
	 * running on browsers that do not support the canvas.
	 */
	//this.Level;
	//init the game with background
	this.init = function(){
		//Get the canvas element
		this.bgCanvas = document.getElementById('background');
		this.pointCanvas = document.getElementById('point');
		
		//test to see if canvas is supported
		if(this.bgCanvas.getContext){
			this.bgContext = this.bgCanvas.getContext('2d');
			this.pointContext = this.pointCanvas.getContext('2d');
			
			//Initialize object to contain their context and canvas information
			Background.prototype.context = this.bgContext;
			Background.prototype.canvasWidth = this.bgCanvas.width;
			Background.prototype.canvasHeight = this.bgCanvas.height;
			Point.prototype.context = this.pointContext;
			Point.prototype.canvasWidth = this.pointCanvas.width;
			Point.prototype.canvasHeight = this.pointCanvas.height;
			this.background = new Background();
			this.point = new Point();
			
			this.point.draw();
			this.point.goRight();
			this.point.goDown();
			this.background.init(0,0);
			this.background.draw();
			return true;

		}else{
			return false;
		}

	};
	//start the real game when user press Start button
	this.start = function(){

	}
	this.area = function(){

	};
}
/*
 * Player Object 
 */
function Player(){
	this.score = function(){

	};

}
/*
 * Point Object
 */
function Point(){
	this.speed = 10;
	this.context.fillStyle = "#FF0000";
	this.x = 15;
	this.y = 15;
	this.draw = function(){
		this.context.drawImage(imageRepository.point, this.x, this.y);
		
	};
	this.goLeft = function(){
		this.context.clearRect(this.x, this.y, this.width, this.height);
		this.x -= this.speed;
		this.y = this.y; 
		this.draw();
	};
	this.goRight = function(){
		this.context.clearRect(this.x, this.y, this.width, this.height);
		this.x += this.speed;
		this.y = this.y; 
		this.draw();
	};
	this.goUp = function(){
		this.context.clearRect(this.x, this.y, this.width, this.height);
		this.x = this.x;
		this.y -= this.speed;
		this.draw();
	};
	this.goDown = function(){
		this.context.clearRect(this.x, this.y, this.width, this.height);
		this.x = this.x;
		this.y += 20;
		this.draw();
	};
	
}
Point.prototype = new Drawable();
/**
 * Initialize the Game and starts it.
 */
var game = new Game();
function init(){
	game.init();
}
