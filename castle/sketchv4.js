let blocks = [];
let currentBlock = 0;

let palette = ["#7DC05D", "#E2A2B6", "#95a3db", "#F67028", "#BEDCFE", "#eef65d"];

function setup() {
  createCanvas(800, 550);
  rectMode(CORNER);
  stroke(30);
  strokeWeight(.7);
  generateCastle();
}

function draw() {
  background("#F3F9E3");

  drawGrain();

  for (let i = 0; i <= currentBlock && i < blocks.length; i++) {
    let b = blocks[i];
    b.update(i === currentBlock);
    b.display();
  }
}

// ----------------------------
// BLOCK CLASS
// ----------------------------

class Block {
  constructor(x, targetY, w, h, type) {
    this.x = x;
    this.y = -100;

    this.targetY = targetY;

    this.w = w;
    this.h = h;
    this.type = type;

    this.color = random(palette);

    this.state = "falling";
  }

  update(isActive) {
    if (!isActive) return;

    if (frameCount % 3 === 0 && this.state === "falling") {
      this.y += 6;

      if (this.y >= this.targetY) {
        this.y = this.targetY - 6;
        this.state = "bouncing";
      }
    }

    if (this.state === "bouncing") {
      this.y += 2;

      if (this.y >= this.targetY) {
        this.y = this.targetY;
        this.state = "landed";
        currentBlock++;
      }
    }
  }

  display() {
    push();

    fill(this.color);
    stroke(25);
    strokeWeight(.7);

    if (this.type === "square") {
      rect(this.x, this.y, this.w, this.w, 6);

      noStroke();
      fill(255, 120);
      circle(this.x + this.w / 2, this.y + this.w / 2, this.w * 0.5);
    }

    else if (this.type === "roof") {
      triangle(
        this.x,
        this.y + this.h,
        this.x + this.w,
        this.y + this.h,
        this.x + this.w / 2,
        this.y
      );
    }

    else if (this.type === "bridge") {
      rect(this.x, this.y, this.w, this.h, 6);

      noStroke();
      fill("#eef65d");

      for (let i = 1; i <= 3; i++) {
        circle(
          this.x + i * (this.w / 4),
          this.y + this.h / 2,
          18
        );
      }
    }

    else if (this.type === "arch") {
      drawArch(this.x, this.y, this.w, this.h, this.color, "#eef65d");
    }

    else if (this.type === "cylinder") {
      drawCylinder(this.x, this.y, this.w, this.h, this.color, "#eef65d");
    }

    pop();
  }
}

// ----------------------------
// CASTLE GENERATION
// ----------------------------

function generateCastle() {

  blocks = [];
  currentBlock = 0;

  let x = 80;
  let baseY = height - 20;

  let towers = int(random(3, 6));

  for (let i = 0; i < towers; i++) {

    let towerWidth = random([50, 60, 70]);
    let levels = int(random(3, 6));

    // 👇 THIS is the important fix
    let stackY = baseY;

    for (let j = 0; j < levels; j++) {

      let type = random(["square", "bridge", "arch", "cylinder"]);

      let h = random(40, 70);

      // optional: enforce minimum height consistency feel
      h = round(h / 5) * 5;

      blocks.push(new Block(
        x,
        stackY,     // 👈 exact stacking position
        towerWidth,
        h,
        type
      ));

      // 👇 NO GAP stacking (this is the key change)
      stackY -= h;
    }

    // roof sits directly on top
    blocks.push(new Block(
      x,
      stackY,
      towerWidth,
      40,
      "roof"
    ));

    x += towerWidth;
  }
}

// ----------------------------
// SHAPES
// ----------------------------

function drawArch(x, y, w, h, c1, c2) {
  fill(c1);

  rect(x, y, w * 0.25, h);
  rect(x + w * 0.75, y, w * 0.25, h);

  fill(c2);
  arc(
    x + w / 2,
    y + h * 0.4,
    w * 0.5,
    w * 0.5,
    PI,
    TWO_PI
  );
}

function drawCylinder(x, y, w, h, c1, c2) {
  fill(c1);
  rect(x, y, w, h);

  fill(c2);
  ellipse(x + w / 2, y, w, 12);
  ellipse(x + w / 2, y + h, w, 12);
}

// ----------------------------
// SAFE GRAIN (NO PIXEL LOOP CRASH)
// ----------------------------

function drawGrain() {
  noStroke();
  fill(0, 12);

  for (let i = 0; i < 1200; i++) {
    circle(random(width), random(height), 1);
  }
}

// ----------------------------
// EXPORT
// ----------------------------

function keyPressed() {
  if (key === "s" || key === "S") {
    saveCanvas("castle", "png");
  }

  if (key === "r" || key === "R") {
    generateCastle();
  }
}