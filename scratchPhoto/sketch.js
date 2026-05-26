let img; 
let stamp; 
let hand; 
let topLayer; 



function preload(){
  img = loadImage("photo1.jpg");
  stamp = loadImage("puzzle.png");
  hand = loadImage("hand.png");
}


function setup() {
  createCanvas(600, 600);
  topLayer = createGraphics(width,height);
  
  //same as drawing on normal canvas except we have to call the draw functions on the graphics object not just globally 
  topLayer.background(200); 
  topLayer.textSize(50); 
  topLayer.textAlign(CENTER);
  topLayer.text("SCRATCH ME", width/2, height/2);
  
  topLayer.imageMode(CENTER); 
  topLayer.strokeWeight(40); // how much we're scratching off 
  
  
  topLayer.blendMode(REMOVE); //blend mode tells p5 how to apply new color on the layer. in this case, we're removing color 


}

function draw() {  
  image(img, 0, 0, width, height); 
  cursor('grab');
  if(mouseIsPressed){
    //topLayer.line(pmouseX,pmouseY,mouseX,mouseY);
    stamp.resize(50,0);
    topLayer.image(stamp, mouseX, mouseY); 
  }
  
  image(topLayer, 0, 0);
}