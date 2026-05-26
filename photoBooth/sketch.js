
// Build something with a webcam

// Move the MOUSE around to change the color of the pixels
// Click with the MOUSE to invert the pixel color
// Use the slider to adjust the threshold for light detection
// Take 4 different portraits 

// Determine video size
let video;
const videoX = 640;
const videoY = 480;

// Determine size of video being shown
const frameSize = 480;
const frameMargin = 20;

// Determine canvas size
let c;
const canvasX = frameSize + frameMargin * 2;
const canvasY = frameSize + frameMargin * 4;

// Variables for controlling the density of pixels
const stepSize = 8;
let threshold = 0.35;
let thresholdMin = 0;
let thresholdMax = 1;

let pixelsInverted = true;
let r, g, b;

// Variables for interactive icons
let photos = [];
let download;
let iconLocations = [];
let iconSize = 45;
let iconMargin = 15;

// Variables to control the light threshold slider
let sliderMin = 20;
let sliderMax = 195;
let circleMin = 20;
let circleMax = 50;
let circleX, circleY, circleSize;

// Variables for timing the picture taking
let photoTimers = [0, 0, 0, 0];
let numbers = [];
let timerLength = 3;

// Keep track of saved pictures
let portraits = [];

function preload() {
  // Import icons
  for (let i = 0; i < 4; i++) photos[i] = loadImage('camera.png');
  for (let i = 0; i < 3; i++) numbers[i] = loadImage((i+1) + '.png');
  numbers[3] = loadImage('check.png');
  download = loadImage('download.png');
}
  

function setup() {
  c = createCanvas(canvasX, canvasY);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(videoX, videoY);
  video.hide();
}

function draw() {
  background(0);
  //image(video,0,0,0,0);
  
  video.loadPixels(); 
  invertPixels();
  drawCircles();
  
  showIcons();
  takePhoto();
}


function mousePressed() {
  // Is the mouse within the frame?
  if (mouseX >= frameMargin && mouseX <= canvasX - frameMargin) {
    if (mouseY >= frameMargin && mouseY <= canvasY - frameMargin * 3) {
      pixelsInverted = !pixelsInverted;
    }
  }
  
  // Check to see if a photo button was clicked
  for (let i = 0; i < iconLocations.length; i += 2) {
    let xMin = iconLocations[i] - iconSize/2;
    let xMax = iconLocations[i] + iconSize/2;
    let yMin = iconLocations[i+1] - iconSize/2;
    let yMax = iconLocations[i+1] + iconSize/2;
    
    // If the mouse is within the proper boundaries
    if (mouseX >= xMin && mouseX <= xMax && mouseY >= yMin && mouseY <= yMax) {
      // Save the combined portrait
      if (i == 8) savePortrait();
      // Save the current canvas
      else photoTimers[i/2] = millis();
    }
  }
}

// Take a photo
function takePhoto() {
  for (let i = 0; i < photoTimers.length; i++) {
    if (photoTimers[i] != 0) {
      
      // If 0 seconds have elapsed
      if (millis() - photoTimers[i] <= 1000) photos[i] = numbers[2];
      
      // If 1 second has elapsed
      else if (millis() - photoTimers[i] <= 2000) photos[i] = numbers[1];
      
      // If 2 seconds have elapsed
      else if (millis() - photoTimers[i] <= 3000) photos[i] = numbers[0];
      
      // If 3 seconds have elapsed
      else if (millis() - photoTimers[i] > 3000) {
        portraits[i] = c.get(frameMargin, frameMargin, frameSize, frameSize);
        photos[i] = numbers[3];
        photoTimers[i] = 0;
      }
    }
  }
}
  

// Save the art piece
function savePortrait() {
  let portraitSize = frameSize*2 + frameMargin*3;
  let finalPortrait = createImage(portraitSize, portraitSize);
  finalPortrait.loadPixels();
  let totalPixels = finalPortrait.pixels.length;
  let rowSize = totalPixels/4/portraitSize;
  
  // Set all the pixels to black
  for (let i = 0; i < totalPixels; i += 4) {
    finalPortrait.pixels[i] = 0;
    finalPortrait.pixels[i+1] = 0;
    finalPortrait.pixels[i+2] = 0;
    finalPortrait.pixels[i+3] = 255;
  }
  
  // Copy the pixels of the smaller portraits into the bigger canvas
  for (let i = 0; i < portraits.length; i++) {
    if (portraits[i] != undefined) {
      portraits[i].loadPixels();
      
      // Iterate through the pixels in the portrait
      for (let y = 0; y < frameSize; y += 4) {
        for (let x = 0; x < frameSize; x += 4) {
          
          // Define positions for the portraits
          let xSkip, ySkip;
          // Y position
          if (i < 2) ySkip = frameMargin * rowSize * 4;
          else ySkip = (frameMargin * 2 + frameSize) * rowSize * 4;
          // X position
          if (i == 0 || i == 2) xSkip = frameMargin;
          else xSkip = frameMargin * 2 + frameSize;
          
          // Iterate through the pixels of the larger canvas
          for (let m = 0; m < 4; m++) {
            for (let n = 0; n < 4; n++) {
              
              let j = ((rowSize * (y+n)) + (xSkip + (x+m))) * 4;
              let k = j + ySkip;
              let l = ((y+n) * frameSize + (x+m)) * 4;

              finalPortrait.pixels[k] = portraits[i].pixels[l];
              finalPortrait.pixels[k+1] = portraits[i].pixels[l+1];
              finalPortrait.pixels[k+2] = portraits[i].pixels[l+2];
            }
          }
        }
      }
    }
  }
  
  finalPortrait.updatePixels();
  finalPortrait.save('photostrip', 'png')
  
  // Reset the icons
  for (let i = 0; i < 4; i++) photos[i] = loadImage('camera.png');
}


// Invert the pixel colors
function invertPixels() {
  if (pixelsInverted) {
    for (i = 0; i < video.pixels.length; i += 4) {
      video.pixels[i + 0] = 255 - video.pixels[i + 0];
      video.pixels[i + 1] = 255 - video.pixels[i + 1];
      video.pixels[i + 2] = 255 - video.pixels[i + 2];
    } 
  }
}


// Draw circles based on the video pixels
function drawCircles() {
  
  let margin = stepSize / 2;
  for (let y = margin; y <= videoY - margin; y += stepSize) {
    for (let x = margin; x <= videoX - margin; x += stepSize) {
      
      const i = y * videoX + x;
      const darkness = (255 - video.pixels[i * 4]) / 255;
      const radius = stepSize * darkness;
      
      fill(pixelColor(i));
      noStroke();
      
      // Determine if the pixels fit within the frame
      let xMin = (videoX - frameSize - (frameMargin*2)) / 2;
      if (x >= xMin && x <= xMin + frameSize) {
        if (y >= 0 && y <= videoY + frameMargin) {
          // If the pixels are darker than the threshold value
          if (darkness >= threshold) {
            ellipse(x - xMin + frameMargin, y + frameMargin, radius, radius);
          }
        }
      }
    }
  }
}

function pixelColor(i) {
  
  // If the mouse is within the frame
  if (mouseX >= frameMargin && mouseX <= frameMargin + frameSize) {
    if (mouseY >= frameMargin && mouseY <= frameMargin + frameSize) {
      r = map(mouseY, canvasY, 0, 0, 255);
      g = map(mouseY, 0, canvasY, 0, 255);
      b = map(mouseX, canvasX/2, canvasX, 0, 255);
    }
  }
  
  return(color(r, g, b));
}


function showIcons() {
  // Show photo icons
  for (let i = 4; i >= 0; i--) {
    let x = canvasX - (iconMargin * 2.5) - ((iconSize + iconMargin) * (4-i));
    let y = canvasY - ((frameMargin * 3) / 2);
    
    imageMode(CENTER);
    if (i != 4) image(photos[i], x, y, iconSize, iconSize);
    else image(download, x, y, iconSize, iconSize);
    
    iconLocations[2*i] = x;
    iconLocations[2*i+1] = y;
  }
  
  // Create the slider for adjusting the light detection threshold
  let height = 10;
  let y = canvasY - ((frameMargin * 3) / 2);
  
  // Draw the slider
  strokeJoin(ROUND);
  stroke(255);
  strokeWeight(4);
  fill(255);
  triangle(sliderMin, y + height, sliderMin, y - height, sliderMax, y);
  
  // Draw the circle
  circleY = y;
  circleX = map(threshold, thresholdMin, thresholdMax, sliderMax + 10, sliderMin + 10);
  circleSize = map(threshold, thresholdMin, thresholdMax, circleMin, circleMax);
  
  fill(color(r, g, b));
  stroke(0);
  strokeWeight(6);
  ellipse(circleX, y, circleSize, circleSize);
  
  // Check to see if the threshold slider was adjusted
  let yMin = circleY - circleMax/2;
  let yMax = circleY + circleMax/2;
  
  if (mouseX >= sliderMin + 10 && mouseX <= sliderMax + 10 && mouseY >= yMin && mouseY <= yMax) {
    if (mouseIsPressed) threshold = map(mouseX, sliderMin + 10, sliderMax + 10, thresholdMax, thresholdMin);
  }
}