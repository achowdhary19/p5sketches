let cols, rows;
let w = 600;
let h = 600;
let scl = 15;
let flying = 0;
let timer = 0; 
let LIFE = 97
let AGE = 22; 


var angle = 0;	// initialize angle variable
var scalar = 150;  // set the radius of circle
var startX = 0;	// set the x-coordinate for the circle center
var startY = 0;	// set the y-coordinate for the circle center

let fish;



function preload() {
  fish = loadImage('fishframe0.png');
  fish2 = loadImage('fishframe1.png');
  greenFish = loadImage('pixil-frame-0 (2).png');
    yellowFish = loadImage('pixil-frame-0 (3).png');
}

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
  
  cols = w / scl;
  rows = h / scl;  
}

let angle1 = 0.0;

function draw() {
	background(0);
	stroke(255);
	noFill();
  
	flying += 0.02;

	let yoff = flying;
	for (let y = 0; y < rows; y++) {
		let xoff = 0.0;
		for (let x = 0; x < cols; x++) {
			let c = map(noise(xoff, yoff), 0, 1, -1, 4);
			fill(c * 25, c * 91, c * 214); // 25, 91, 214
			noStroke();
			xoff += 0.6;
			rect(x * scl, y * scl, scl, scl);
          
          
          
          
          
          
		}
		yoff += 0.6;
	}
  


  
    //translate(300, 300);
    //rotate(-90);
    //because we rotated our y axis is now horizontal and x axis is vertical 


    let hr = hour();
    let mn = minute();
    let sc = second();
    stroke('black');
    noFill();
  
 // let secondAngle = map(sc, 0, 60, 0, 360);
  //the number seconds is converted from a value in the range of 0 to 60 into a value that ranges from 0 to 360, a full rotation 
  
//   arc(0, 0, 300, 300, 0, secondAngle);
  

//   var a = startX +  cos(secondAngle)* scalar;
//   var b = startY +  sin(secondAngle) * scalar;
  
//   image(fish, a, b);
 
  
  
  
//   stroke(150, 100, 255);
//   let minuteAngle = map(mn, 0, 60, 0, 360);
//   arc(0, 0, 330, 330, 0, minuteAngle);
  
//   var c = startX +  cos(minuteAngle)* scalar;
//   var d = startY +  sin(minuteAngle) * scalar;
//   image(fish, c, d);
  
//   stroke(150, 255, 100);
//   let hourAngle = map(hr, 0, 24, 0, 360);
//   //let hourAngle = map(hr % 12, 0, 12, 0, 360);
//   arc(0, 0, 360, 360, 0, hourAngle);
  
//   var e = startX +  cos(hourAngle)* scalar;
//   var f = startY +  sin(hourAngle) * scalar;
//  //  rotate(40*PI);
  //image(fish, e, f);
  
  
  
  //rotate(180);
  //translate(392, -300); //should be at x,y coord 0, 500 
  strokeCap(SQUARE);
  
  
  let secondAngle = map(sc, 0, 60, 0, 600);
  //blendMode(LIGHTEST);
  stroke("pink");
  strokeWeight(15);
  line(0,35, 600,35); //all the time in the world 
  let darkness = color("black");
  //darkness.setAlpha(0);
  stroke(darkness);
  line(0,35, secondAngle, 35);
 // blendMode(BLEND);
  //image(fish,secondAngle2*.66-15, 105);
  image(fish, secondAngle-25, 5); //unscaled fish 

  let minuteAngle = map(mn, 0, 60, 0, 600);
  stroke("#fdd80c");
  line(0,135, 600,135); //all the time in the world   stroke("black");
  stroke("black");
  line(0,100+35, minuteAngle, 100+35); //the time taking over all the time in the world
  image(yellowFish, minuteAngle-25, 100);

  
  let hourAngle = map(hr, 0, 24, 0, 600);
  stroke("#7aaa34");
  line(0,235,600, 235); //all the time in the world 
  stroke("black"); 
  line(0, 235, hourAngle, 235); //the time taking over all the time in the world
  image(greenFish, hourAngle-25, 200);
  
  
  let dayNum = map (day(), 0, 31, 0, 600);
  stroke("purple");
  line(0,335,600,335);
  stroke('black');
  line(0, 335, dayNum, 335);
 image(fish, dayNum-25, 305);
  
  
  
  let monthNum = map(month(), 0, 12, 0, 600);
  stroke ('purple');
  line(0,435, 600, 435);
  stroke('black');
  line(0, 435, monthNum, 435);
  image(yellowFish, monthNum-25, 400);
  
  
//   let dayNum = map (day(), 0, 31, 0, 600);
//   stroke("purple");
//   line(0,335,600,335);
//   stroke('black');
//   line(0, 335, dayNum, 335);
  
  let newYear = map(AGE, 0, LIFE, 0, 600);
  stroke('white'); 
  line(0,535, 600, 535);
    stroke('black');
  line(0,535, newYear, 535);
  image(greenFish, monthNum-25, 400);

}