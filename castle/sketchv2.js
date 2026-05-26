let blocks = [];

let palette = [
  "#7DC05D",
  "#E2A2B6",
  "#95a3db",
  "#F67028",
  "#BEDCFE",
  "#eef65d",
  "#DB5943"
];

class Block {

  constructor(x, targetY, w, h, type) {

    this.x = x;

    this.y = -200;

    this.targetY = targetY;

    this.w = w;
    this.h = h;

    this.type = type;

    this.color = random(palette);

    this.speed = random(2, 5);
  }

  update() {

    if (this.y < this.targetY) {
      if (frameCount % 4 === 0) {
  this.y += 4;
}
    }

    this.y = min(this.y, this.targetY);
  }

  display() {

    push();

    noStroke();

    if (this.type === "square") {

      fill(this.color);

      rect(this.x, this.y, this.w, this.w, 8);

      fill(255, 120);

      circle(
        this.x + this.w / 2,
        this.y + this.w / 2,
        this.w * 0.5
      );
    }

    else if (this.type === "roof") {

      fill(this.color);

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

      fill(this.color);

      rect(this.x, this.y, this.w, this.h, 8);

      fill("#eef65d");

      let spacing = this.w / 4;

      for (let i = 1; i <= 3; i++) {

        circle(
          this.x + spacing * i - spacing / 2,
          this.y + this.h / 2,
          20
        );
      }
    }

    else if (this.type === "arch") {

      drawArch(
        this.x,
        this.y,
        this.w,
        this.h,
        this.color,
        "#eef65d"
      );
    }

    else if (this.type === "cylinder") {

      drawCylinder(
        this.x,
        this.y,
        this.w,
        this.h,
        this.color,
        "#eef65d"
      );
    }

    else if (this.type === "crenellation") {

      fill(this.color);

      drawCrenellations(
        this.x,
        this.y,
        this.w,
        10
      );
    }

    pop();
  }
}

function setup() {

  createCanvas(700, 500);

  rectMode(CORNER);

  generateCastle();
}

function draw() {

  background("#F3F9E3");

  for (let block of blocks) {

    block.update();

    block.display();
  }
}

function generateCastle() {

  blocks = [];

  let x = 80;

  let currentY = height - 80;

  let towerCount = int(random(3, 6));

  for (let i = 0; i < towerCount; i++) {

    let towerWidth = random([50, 60, 70]);

    let levels = int(random(2, 5));

    let y = currentY;

    for (let j = 0; j < levels; j++) {

      let possibleTypes = [
        "square",
        "bridge",
        "arch",
        "cylinder"
      ];

      let type = random(possibleTypes);

      let h = random(40, 70);

      blocks.push(
        new Block(
          x,
          y,
          towerWidth,
          h,
          type
        )
      );

      y -= h + 8;
    }

    // roof
    blocks.push(
      new Block(
        x,
        y,
        towerWidth,
        40,
        "roof"
      )
    );

    // crenellations
    if (random() > 0.5) {

      blocks.push(
        new Block(
          x,
          y - 20,
          towerWidth,
          20,
          "crenellation"
        )
      );
    }

    x += towerWidth + random(20, 50);
  }
}

function mousePressed() {

  generateCastle();
}

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

function drawCrenellations(x, y, w, size) {

  for (let i = 0; i < w; i += size * 2) {

    rect(
      x + i,
      y,
      size,
      size
    );
  }
}