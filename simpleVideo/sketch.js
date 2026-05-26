// March 22, 2019
// Lab 10: Pixels and Video

// Move the MOUSE around to change the color of the pixels!

let video;

function setup() {
  createCanvas(640,480);
  video = createCapture(VIDEO);
  video.size(640,480);
  video.hide();
}

function draw() {
  background(220);
  image(video,0,0,0,0);
  video.loadPixels(); 
  
// Apply a color change based on the mouse location
for (i = 0; i < video.pixels.length; i += 4) {
    
  let redtint = map(mouseY,height,0,0,255);
  let greentint = map(mouseY,0,height,0,255);
  let bluetint = map(mouseX,width/2,width,0,255);

    video.pixels[i + 0] += redtint;
    video.pixels[i + 1] += greentint;
    video.pixels[i + 2] += bluetint;
}

// Invert the pixels if the mouse is pressed
if (mouseIsPressed) {
  
  for (i = 0; i < video.pixels.length; i += 4) {

    video.pixels[i + 0] = 255 - video.pixels[i + 0];
    video.pixels[i + 1] = 255 - video.pixels[i + 1];
    video.pixels[i + 2] = 255 - video.pixels[i + 2];

  }
}
  video.updatePixels();
}