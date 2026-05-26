let myBox;
let interval = 1;
var xspace = 0;
var yspace = 0;
var tracker = 0;
﻿
var triangleHeight;
﻿
class myFirstBox {
  constructor(x, y, width, corner) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.corner = corner;
  }
}
﻿
class myTriangle {
  constructor(x1, y1, x2, y2, x3, y3) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.x3 = x3;
    this.y3 = y3;
  }
}
﻿
class myRectangle {
  constructor(x, y, w, h, tl, tr, bl, br) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.tl = tl;
    this.tr = tr;
    this.bl = bl;
    this.br = br;
  }
}
﻿
function setup() {
  createCanvas(400, 400);
  //background('#f2d4d5'); that light pink color
  strokeWeight(0.25);
  background("#F3F9E3");
﻿
  var listOfColors = [
    color("#118847"),
    color("##e61f27 "),
    color("##f9ea63"),
    color("##154176"),
  ];
﻿
  //    let green = color(listOfColors[0]);
  //   // let red = color(listOfColors[1]);
  //   let yellow = color(listOfColors[2]);
  //   // let blue = color(listOfColors[3]);
﻿
  fill(listOfColors[int(random(0, listOfColors.length))]);
  myBox = new myFirstBox(50, 70, 50, 10); //setting up
  box2 = new myFirstBox(50, 70, 50, 10);
  box3 = new myRectangle(50, 70, 80, 35, 5, 5, 5, 5);
  box4 = new myFirstBox(50, 70, 50, 10);
  triangle1 = new myTriangle(50, 70, 100, 70, 75, 30);
﻿
  p2b1 = new myFirstBox(100, 70, 75, 10);
  p2t1 = new myTriangle(130, 70, 164, 70, 147, 20);
﻿
  p3r1 = new myRectangle(175, 70, 102, 40, 7, 7, 7, 7);
}
﻿
function draw() {
  drawCastle();
  //castle2();
  //castle3();
}
﻿
function drawCastle() {
  if (frameCount % (interval * 10) == 5) {
    background("#F3F9E3"); //so that itll look like its animating/moving
﻿
    fill("#7DC05D");
    square(myBox.x, myBox.y + yspace, myBox.width); //draw first box
    fill("#c5bbf6");
    arc(myBox.x+myBox.width/2, myBox.y+myBox.width/2, 40, 40, 20, PI + QUARTER_PI, CHORD);
    //fill('#A4CBF7');
    //arc(myBox.x+30, myBox.y+10, 40, 40, 30, PI + QUARTER_PI, CHORD);
﻿
    myBox.y = myBox.y + 1 * deltaTime; //move it
﻿
    if (myBox.y >= height - myBox.width) {
      //if it reaches the bottom
      myBox.y = height - myBox.width; //put it there
﻿
      fill("#E2A2B6");
      square(box2.x, box2.y, box2.width); //draw new box
      box2.y = box2.y + 1 * deltaTime; //move it
      if (box2.y > myBox.y - box2.width) {
        //if it reaches the bottom
        box2.y = myBox.y - box2.width; // put it there
﻿
        fill("#DB5943");
        //rectMode(CENTER);
        rect(
          box3.x,
          box3.y,
          box3.w,
          box3.h,
          box3.tl,
          box3.tr,
          box3.br,
          box3.bl
        ); //draw new box
        //rectMode(CORNER);
        box3.y = box3.y + 1 * deltaTime; //move it
        if (box3.y > box2.y - box3.h) {
          box3.y = box2.y - box3.h;
﻿
          fill("#7DC05D");
          square(box4.x, box4.y, box4.width, box4.corner); //draw new box
          box4.y = box4.y + 1 * deltaTime; //move it
          if (box4.y > box3.y - box4.width) {
            box4.y = box3.y - box4.width;
﻿
            fill("#eef65d");
            triangle(
              triangle1.x1,
              triangle1.y1,
              triangle1.x2,
              triangle1.y2,
              triangle1.x3,
              triangle1.y3
            ); //lets try drawing the top!
            triangle1.y1 += 1 * deltaTime;
            triangle1.y2 += 1 * deltaTime;
            triangle1.y3 += 1 * deltaTime;
            triangleHeight = triangle1.y1 - triangle1.y3;
            if (triangle1.y1 > box4.y) {
              //since we're using a bottom triangle point, we dont need to subtract its height until we set the top point.
              triangle1.y1 = box4.y;
              triangle1.y2 = box4.y;
              triangle1.y3 = box4.y - triangleHeight;
              castle2(); //start building next pillar
            }
          }
        }
      }
    }
  }
}
﻿
function castle2() {
  if (frameCount % (interval * 10) == 5) {
    //background("#F3F9E3"); //so that itll look like its animating/moving
﻿
    fill("#95a3db ");
    square(p2b1.x, p2b1.y, p2b1.width, p2b1.corner); //draw first box
    let circleX = p2b1.x + p2b1.width / 2;
    let circleY = p2b1.y + p2b1.width / 2;
﻿
    //fill("#ded878");
    fill("#eef65d");
﻿
    circle(circleX, circleY, p2b1.width / 1.5);
﻿
    p2b1.y = p2b1.y + 1 * deltaTime; //move it
﻿
    if (p2b1.y >= height - p2b1.width) {
      //if it reaches the bottom
      p2b1.y = height - p2b1.width; //put it there
﻿
      fill("#F67028");
      triangle(p2t1.x1, p2t1.y1, p2t1.x2, p2t1.y2, p2t1.x3, p2t1.y3);
      p2t1.y1 += 1 * deltaTime;
      p2t1.y2 += 1 * deltaTime;
      p2t1.y3 += 1 * deltaTime;
      triangleHeight = p2t1.y1 - p2t1.y3;
      if (p2t1.y1 > p2b1.y) {
        p2t1.y1 = p2b1.y;
        p2t1.y2 = p2b1.y;
        p2t1.y3 = p2b1.y - triangleHeight;
﻿
        fill("#BEDCFE");
        let circleD = 20;
﻿
        circleX = p2t1.x3;
        //circleY = 70;
        circleY = p2t1.y3 - circleD / 2;
        //circleY = circleY + 1 * deltaTime;
﻿
        circle(circleX, circleY, circleD);
﻿
        castle3();
      }
    }
  }
}
﻿
function castle3() {
  if (frameCount % (interval * 10) == 5) {
    //background("#F3F9E3"); //so that itll look like its animating/moving
    fill("#BEDCFE");
    rect(p3r1.x, p3r1.y, p3r1.w, p3r1.h, p3r1.tl, p3r1.tr, p3r1.br, p3r1.bl);
    fill("#F67028");
    circleD = 25;
    // circleX = p3r1.x + circleD;
    // circleY = p3r1.h/2;
    //circle(circleX, circleY, circleD);
    let circleX = p3r1.x + p3r1.w / 5;
    let circleY = p3r1.y + p3r1.h / 2;
    circle(circleX, circleY, circleD);
    circle(circleX + circleD + 5, circleY, circleD);
    circle(circleX + circleD * 2 + 10, circleY, circleD);
﻿
    p3r1.y = p3r1.y + 1 * deltaTime;
﻿
    if (p3r1.y >= height - p3r1.h) {
      p3r1.y = height - p3r1.h; //put it there
    }
  }
}
﻿
console.log(yspace);
﻿
if (tracker > 270) {
  tracker = 0;
  yspace = 0;
  console.log(yspace);
}
﻿
//     if (tracker >= 315){
//       yspace = 0;
//       //yspace +=45;
//       xspace = 45;
//       if (tracker >=630){
//         xspace += 45;
//         if(tracker>945){
//           xspace += 45;
﻿
//           if (tracker > 1260){
//             xspace += 45;
//             if (tracker>1575){
//               xspace += 45
//               if (tracker>1890){
//                 tracker = 0;
//               }
//             }
//           }
//         }
//       }
//     }
﻿
//why is this stlil printint in console if the loop is done
﻿
function drawBox() {
  let c = color(100, 100, 160);
  fill(c);
  let space = 0;
﻿
  if (frameCount % (interval * 30) == 0) {
    square(myBox.x, myBox.y, myBox.width);
    //space += 45;
  }
}
﻿
function drawBox2() {
  let c = color(100, 100, 160);
  fill(c);
  let space = 0;
﻿
  if (frameCount % (interval * 30) == 0) {
  }
  for (var i = 0; i <= 7; i++) {
    square(myBox.x, myBox.y - space, myBox.width);
    space += 45;
  }
} 