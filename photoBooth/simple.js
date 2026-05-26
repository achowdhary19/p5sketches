// SIMPLE WEBCAM PORTRAIT TOOL
// SPACE = capture
// S = save
// click = invert

let video;

const camW = 640;
const camH = 480;

const frameSize = 580;
const stepSize = 8;

let threshold = 0.35;
let pixelsInverted = true;

let savedPortrait;

let r = 255;
let g = 120;
let b = 180;

// crop values
let cropX;
let cropSize;

function setup() {

  createCanvas(620, 620);

  pixelDensity(1);

  video = createCapture(VIDEO);
  video.size(camW, camH);
  video.hide();

  textAlign(CENTER);
  textSize(16);

  // center crop webcam into square
  cropSize = camH;
  cropX = (camW - cropSize) / 2;
}

function draw() {

  background(15);

  video.loadPixels();

  if (pixelsInverted) {
    invertPixels();
  }

  drawPortrait();

  drawUI();

  if (savedPortrait) {
    image(savedPortrait, 20, 500, 100, 100);
  }
}

// ------------------------------------
// DRAW PORTRAIT
// ------------------------------------

function drawPortrait() {

  let margin = stepSize / 2;

  for (let y = margin; y < cropSize - margin; y += stepSize) {

    for (let x = margin; x < cropSize - margin; x += stepSize) {

      // shifted x for center crop
      let camX = x + cropX;

      let index = (int(camX) + int(y) * camW) * 4;

      let brightness =
        (
          video.pixels[index] +
          video.pixels[index + 1] +
          video.pixels[index + 2]
        ) / 3;

      let darkness = 1 - brightness / 255;

      if (darkness > threshold) {

        let radius = darkness * stepSize * 1.4;

        fill(getMappedColor(x, y));
        noStroke();

        ellipse(
          map(x, 0, cropSize, 20, 500),
          map(y, 0, cropSize, 20, 500),
          radius,
          radius
        );
      }
    }
  }
}

// ------------------------------------
// COLOR MAPPING
// ------------------------------------

function getMappedColor(x, y) {

  r = map(mouseX, 0, width, 50, 255);
  g = map(mouseY, 0, height, 50, 255);
  b = map(x, 0, cropSize, 100, 255);

  return color(r, g, b);
}

// ------------------------------------
// INVERT PIXELS
// ------------------------------------

function invertPixels() {

  for (let i = 0; i < video.pixels.length; i += 4) {

    video.pixels[i] = 255 - video.pixels[i];
    video.pixels[i + 1] = 255 - video.pixels[i + 1];
    video.pixels[i + 2] = 255 - video.pixels[i + 2];
  }
}

// ------------------------------------
// UI
// ------------------------------------

function drawUI() {

  fill(255);
  noStroke();

  text(
    "SPACE = capture portrait   |   S = save image   |   click = invert colors",
    width / 2,
    545
  );

  text(
    "move mouse vertically to change density and  horizontally to change color",
    width / 2,
    570
  );

  threshold = map(mouseY, 0, height, 0.05, 0.8);
}

// ------------------------------------
// SAVE IMAGE
// ------------------------------------

function keyPressed() {

  if (key === ' ') {

    savedPortrait = get(20, 20, 480, 480);
  }

  if (key === 's' || key === 'S') {

    saveCanvas("portrait.png");
  }
}

// ------------------------------------
// TOGGLE INVERT
// ------------------------------------

function mousePressed() {

  pixelsInverted = !pixelsInverted;
}