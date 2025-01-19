// assigning canvas height and weight
const width = 960;
const height = 540;

// other variables
let cloudPositions = [];
let black, white, darkWhite, grey, red, darkRed, lightGrey, darkGrey, yellow, skyBlue, brown, treeGreen, grassGreen;
let crown, bannerFont, carFont;
let tireRotAngle = 0;

// preload for images and fonts
function preload() {
  bannerFont = loadFont('banner_font.otf');
  carFont = loadFont('car_font.otf');
  // I cropped just the crown out for this part
  // Image: Goodwood Festival of Speed on Motor 1 - https://cdn.motor1.com/images/mgl/8LyqW/s1/goodwood-festival-of-speed-logo.webp
  crown = loadImage('crown.png');
}

function setup() {
  createCanvas(width, height);

  // was having performance issues so had to lock the frame rate to 30 (on openprocessing this is still too much)
  frameRate(30);

  // colours
  skyBlue = color('#355D7E');
  black = color(0);
  white = color(240, 240, 240);
  darkWhite = color(225, 225, 225);
  lightGrey = color(0, 0, 0, 70)
  grey = color(130, 130, 130);
  darkGrey = color(50, 50, 50);
  red = color(205, 10, 10);
  darkRed = color(220, 20, 20);
  yellow = color(200, 200, 0);
  brown = color(83, 53, 10);
  treeGreen = color("#3a5311");
  grassGreen = color("#387300");

  noStroke();

  // create array of cloud positions
  cloudPositions = [

    {
      cX: random(0, 100),
      cY: random(-25, 25),
    },
    {
      cX: random(500, 600),
      cY: random(-25, 25),
    },
    {
      cX: random(350, 200),
      cY: random(100, 125)
    },
    {
      cX: random(850, 900),
      cY: random(100, 125)
    },
    // {
    //   cX: random(750, 850),
    //   cY: random(130, 150)
    // },
    // {
    //   cX: random(1150, 1150),
    //   cY: random(130, 150)
    // }
  ];
}

// car position on canvas
const rX = width / 2;
const rY = 496;

// 10 seconds (tires)
let runFrames = 30 * 10;
// 2 seconds (tires)
let stopFrames = 30 * 2;
let cycleFrames = runFrames + stopFrames;

function draw() {
  // draw functions
  drawSky();
  clouds();
  //drawAllClouds();
  drawBanner();
  drawGround();
  drawRoad();
  drawMclarenF1();
  drawTree(100, 540);
  drawTree(860, 540);
  dateText(width/2, height / 2 + 40);

  // make the clouds move to the right and reset once they leave the page
  for (let j = 0; j < cloudPositions.length; j++) {
    cloudPositions[j].cX += 0.7;
    if (cloudPositions[j].cX > width + 150) {
      cloudPositions[j].cX = -150;
    }
  }

  // rear tire
  drawTire(rX - 154, rY + 11);
  // front tire
  drawTire(rX + 116, rY + 12.5);

  // check what part of run/stop cycle it is in
  let frameInCycle = frameCount % cycleFrames;

  // if its in the run part of the cycle rotate the tire
  if (frameInCycle < runFrames) {
    tireRotAngle += 40;
  } else {
    tireRotAngle += 0;
  }
}

// draw the sky
function drawSky() {
  noStroke();
  fill(skyBlue);
  rect(0, 0, width, height);
}

// // had help from carla for this part
// function drawClouds(cX, cY) {
//   fill(clouds);
//   noStroke();
//
//   // draw the cloud pieces
//   // center
//   fill(clouds);
//   ellipse(cX, cY, 100, 60);
//   // upper left
//   ellipse(cX - 10, cY - 25, 80, 50);
//   // // middle left
//   ellipse(cX - 28, cY, 90, 50);
//   // // middle bottom
//   ellipse(cX - 10, cY+17, 90, 50);
//   // // bottom right
//   ellipse(cX + 25, cY + 15, 90, 50);
//   // top rigjht
//   ellipse(cX + 30, cY - 15, 80, 50);
// }
//
// // draws all the clouds on the screen
// function drawAllClouds() {
//   for (let i = 0; i < cloudPositions.length; i++) {
//     drawClouds(cloudPositions[i].cX, cloudPositions[i].cY);
//   }
// }

// Banner is based off of the actual banner seen at the 'Goodwood Festival of Speed'
// Image: Goodwood Festival of Speed on Motor 1 - https://cdn.motor1.com/images/mgl/8LyqW/s1/goodwood-festival-of-speed-logo.webp
function drawBanner() {
  noStroke();
  fill(200);
  // center
  rect(150, 105, width - 300, 105);
  // left triangle
  triangle(20, 210, 150, 105, 150, 210);
  //right triangle
  triangle(810, 210, 810, 105, 940, 210);
  // left side
  rect(20, 210, 160, 330);
  // right side
  rect(780, 210, 160, 330);

  // Banner is based off of the actual banner seen at the 'Goodwood Festival of Speed'
  // I cropped just the crown out for this part
  // Image: Goodwood Festival of Speed on Motor 1 - https://cdn.motor1.com/images/mgl/8LyqW/s1/goodwood-festival-of-speed-logo.webp
  image(crown, 444.3, 60.5, 70, 50);

  // upper banner (black)
  beginShape();
  fill(black);
  stroke(black);
  strokeWeight(2);
  vertex(304, 127);
  vertex(319.5, 155.3);
  vertex(639.5, 155.3);
  vertex(655.5, 127);
  endShape(CLOSE);

  // lower banner (white)
  fill(white);
  beginShape();
  vertex(320, 157);
  vertex(304.5, 187);
  vertex(655, 187);
  vertex(639.5, 157)
  endShape(CLOSE);

  // text on banners
  textFont(bannerFont);
  textSize(18);
  noStroke();
  fill(white);
  text("G  O  O  D", 400-25, 149.5);
  text("W  O  O  D", 570+10, 149.5);
  fill(black);
  textSize(12.8);
  text("F E S T I V A L", 400-25, 177);
  text("O F    S P E E D", 570+10, 177);

  //c centerpiece
  // outer grey circle
  strokeWeight(2);
  stroke(black);
  fill(grey);
  ellipse(480, 155, 87, 108);

  // chequered flag inside center ring
  noStroke();
  let squareSize = 12;
  let numCols = 5;
  let numRows = 6;
  // start point (x value)
  let x = 450;
  // start point (y value)
  let y = 118.5;

  // using for loops to create the grid with squares
  // Used the following tutorial to help create the checkerboard
  // Checkerboard adapted from P5.js example by GDD140-J_Chaput
  // Original: https://editor.p5js.org/GDD140-J_Chaput/sketches/WUQILffTb
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      // if the value is pos or neg set the color accordingly (creates black/white alternation)
      if ((i + j) % 2 === 0) {
        fill(black);
      } else {
        fill(white);
      }
      rect(x + j * squareSize, y + i * squareSize, squareSize, squareSize);
    }
  }

  // inner circle
  noFill();
  stroke(black);
  strokeWeight(2);
  ellipse(480, 155, 57, 75);

  // left side circle fill
  fill(grey);
  noStroke();
  beginShape();
  vertex(449, 118.5);
  bezierVertex(434, 140, 434, 171, 449, 191)
  vertex(449, 191);
  vertex(470, 191);
  bezierVertex(444.5, 178, 444.5, 131, 470.5, 118.5)
  vertex(470.5, 118.5);
  endShape(CLOSE);

  // right side circle fill
  fill(grey);
  beginShape();
  vertex(489.5, 118.5);
  bezierVertex(515.5, 131, 515.5, 178, 491, 191)
  vertex(491, 191);
  vertex(511, 191);
  bezierVertex(526.5, 171, 526.5, 140, 511, 118.5)
  vertex(511, 118.5);
  endShape(CLOSE);

  // shadow under the main banner piece
  noStroke();
  fill(55)

  // top
  beginShape();
  vertex(180, 210);
  vertex(230, 260);
  vertex(780, 260);
  vertex(780, 210);
  endShape(CLOSE);

  // left
  beginShape();
  vertex(180, 210);
  vertex(180, 540);
  vertex(230, 490);
  vertex(230, 259);
  endShape(CLOSE);

  // right
  beginShape();
  vertex(730, 210);
  vertex(730, 490);
  vertex(780, 540);
  vertex(780, 259);
  endShape(CLOSE);
}

// draw the ground
function drawGround() {
  fill(grassGreen);
  noStroke();
  beginShape();
  vertex(230, 390);
  vertex(230, 489);
  vertex(180, 539);
  vertex(780, 539);
  vertex(730, 489);
  vertex(730, 390);
  endShape(CLOSE);
}

// TODO: draw the road - done
function drawRoad() {
  fill(darkGrey);
  beginShape();
  // top left
  vertex(650, 390);
  // top right
  vertex(730, 390);
  // middle right
  vertex(730, 430);
  // right bend
  bezierVertex(570, 440, 570, 450, 570, 540);
  // bottom left
  vertex(347, 540);
  // left curve
  bezierVertex(350, 470, 350, 410, 700, 390);
  endShape(CLOSE);
}

// Car is based off the following image of the 1993 McLaren MP4/8 Formula 1 car
// Image: F1 MCLAREN MP4/8 DE 1993 on BONS RAPAZES - https://bonsrapazes.com/wp-content/uploads/2018/05/senna-mclaren-cosworth-2.jpg
function drawMclarenF1(x, y) {
  noStroke();

  // steering wheel
  fill(black);
  ellipse(rX + 43, rY - 16, 4, 10);

  // rear wing (outside)
  fill(darkRed);
  beginShape();
  // top left
  vertex(rX - 194, rY - 50);
  // bottom left
  vertex(rX - 194, rY + 4);
  // bottom right
  vertex(rX - 184, rY + 4);
  // curve
  bezierVertex(rX - 182, rY - 1, rX - 180, rY - 15, rX - 156, rY - 20)
  // middle right
  vertex(rX - 152, rY - 31);
  // top right
  vertex(rX - 152, rY - 49);
  // top right curve
  bezierVertex(rX - 152, rY - 49, rX - 152, rY - 53, rX - 156, rY - 53);
  // top
  vertex(rX - 190, rY - 53);
  // top left curve
  bezierVertex(rX - 194, rY - 53, rX - 194, rY - 50, rX - 194, rY - 50);
  endShape(CLOSE);

  // rear wing (inside)
  fill(black);
  beginShape();
  // top left
  vertex(rX - 152, rY - 51);
  // middle left
  vertex(rX - 152, rY - 31);
  // bottom right
  vertex(rX - 156, rY - 20);
  // bottom curve
  bezierVertex(rX - 154, rY - 20, rX - 153, rY - 20, rX - 147, rY - 19);
  // middle right
  vertex(rX - 142, rY - 31);
  // top riight
  vertex(rX - 142, rY - 47);
  // top right curve
  bezierVertex(rX - 143, rY - 51, rX - 140, rY - 51, rX - 152, rY - 51);
  endShape(CLOSE);

  // back grey piece behind bargeboard
  fill(darkGrey);
  rect(rX + 5, rY, 10, 30);

  // bottom body (red)
  fill(darkRed);
  beginShape();
  // top left
  vertex(rX - 127, rY - 5);
  // left curve
  bezierVertex(rX - 121, rY + 7, rX - 122, rY + 20, rX - 128, rY + 28);
  // bottom curve
  bezierVertex(rX - 100, rY + 30.2, rX - 80, rY + 30.4, rX - 49, rY + 30.5);
  // top right
  vertex(rX - 73, rY - 7);
  endShape(CLOSE);

  // bottom body (white)
  fill(white);
  beginShape();
  // top left
  vertex(rX - 73, rY - 7);
  // bottom left
  vertex(rX - 49, rY + 30.5);
  // bottom right
  vertex(rX + 8.5, rY + 30.5);
  // top right
  vertex(rX + 8.5, rY - 5);
  // top curve
  bezierVertex(rX - 5, rY - 11, rX - 40, rY - 8.5, rX - 73, rY - 7);
  endShape(CLOSE);

  // top body (white)
  fill(darkWhite);
  beginShape();
  // top left
  vertex(rX - 135, rY - 13);
  // left curve
  bezierVertex(rX - 131, rY - 10, rX - 129, rY - 8, rX - 127, rY - 4);
  // bottom curve
  bezierVertex(rX - 90, rY - 6, rX - 50, rY - 9, rX + 8.5, rY - 5);
  // mid point
  vertex(rX + 8.5, rY + 3);
  // right of the mid point
  bezierVertex(rX + 20, rY + 3, rX + 30, rY + 3, rX + 54, rY + 3);
  // top right
  vertex(rX + 43, rY - 14);
  // middle middle
  vertex(rX - 9, rY - 14);
  // intake
  bezierVertex(rX - 15, rY - 20, rX - 15, rY - 35, rX - 12, rY - 53);
  // fin
  bezierVertex(rX - 15, rY - 61, rX - 50, rY - 55, rX - 132, rY - 14);
  endShape(CLOSE);

  // text on the car
  fill(black);
  textSize(13);
  textFont(carFont);
  text("McLaren", rX-55, rY - 21);

  // top body (red)
  fill(red);
  beginShape();
  // top left
  vertex(rX + 42, rY - 13.5);
  // bottom left
  vertex(rX + 53.5, rY + 3);
  // bottom curve
  bezierVertex(rX + 65, rY, rX + 75, rY, rX + 88, rY);
  // right bottom curve
  bezierVertex(rX + 93, rY - 10, rX + 97, rY - 12, rX + 101, rY - 14);
  // top right
  vertex(rX + 92, rY - 23);
  // top curve
  bezierVertex(rX + 70, rY - 25, rX + 60, rY - 25, rX + 50, rY - 24);
  // left curve
  bezierVertex(rX + 49, rY - 18, rX + 45, rY - 16, rX + 42, rY - 14);
  endShape(CLOSE);

  // back floor
  fill(black);
  beginShape();
  // top left
  vertex(rX - 128, rY + 28);
  // left curve
  bezierVertex(rX - 129, rY + 30, rX - 136, rY + 37, rX - 138, rY + 37);
  // bottom right
  vertex(rX + 11, rY + 37);
  // top right
  vertex(rX + 11, rY + 30);
  // top curve
  bezierVertex(rX - 40, rY + 31, rX - 90, rY + 30, rX - 128, rY + 28);
  endShape(CLOSE);

  // bargeboard shadow
  fill(lightGrey);
  beginShape();
  vertex(rX + 8.5, rY - 5);
  vertex(rX + 8.5, rY + 3);
  vertex(rX + 88, rY + 3);
  vertex(rX + 90, rY - 2);
  bezierVertex(rX + 90, rY - 3, rX + 65, rY - 4, rX + 45, rY - 5);
  bezierVertex(rX + 30, rY - 4, rX + 25, rY - 2, rX + 10, rY - 4);
  endShape(CLOSE);

  // bargeboard (white)
  fill(white);
  beginShape();
  // top left
  vertex(rX + 11, rY + 3);
  // bottom left
  vertex(rX + 11, rY + 34);
  // bottom right
  vertex(rX + 79, rY + 34);
  // top right
  vertex(rX + 56, rY + 3);
  endShape(CLOSE);

  // bargeboard (red)
  fill(darkRed);
  beginShape();
  // top left
  vertex(rX + 53.5, rY + 3);
  // bottom left
  vertex(rX + 76, rY + 34);
  // bottom right
  vertex(rX + 87, rY + 34);
  // right middle
  vertex(rX + 87, rY + 24);
  // right curve
  bezierVertex(rX + 84, rY + 15, rX + 85, rY + 5, rX + 88, rY);
  // top curve
  bezierVertex(rX + 80, rY - 1, rX + 70, rY, rX + 53.5, rY + 3);
  endShape(CLOSE);

  // front floor
  fill(black);
  beginShape();
  // top left
  vertex(rX + 10, rY + 34);
  // bottom left
  vertex(rX + 10, rY + 37);
  // bottom right
  vertex(rX + 81, rY + 37);
  // top right
  vertex(rX + 81, rY + 34);
  endShape(CLOSE);

  // top front wing
  fill(darkWhite);
  beginShape();
  vertex(rX + 92, rY - 23);
  vertex(rX + 101, rY - 14);
  bezierVertex(rX + 101, rY - 15, rX + 110, rY - 18, rX + 115, rY - 18);
  endShape(CLOSE);

  // front wing
  fill(darkWhite);
  beginShape();
  // top left
  vertex(rX + 138, rY - 11);
  // right curve
  bezierVertex(rX + 150, rY - 6, rX + 174, rY + 7, rX + 184, rY + 15);
  // bottom curve
  bezierVertex(rX + 170, rY + 10, rX + 150, rY + 8, rX + 146.5, rY + 9);
  // left curve
  bezierVertex(rX + 144, rY - 3, rX + 139, rY - 7, rX + 137, rY - 11);
  endShape(CLOSE);

  // front wing endplate
  fill(white);
  beginShape();
  // top left
  vertex(rX + 146.5, rY + 8);
  // left curve
  bezierVertex(rX + 146.5, rY + 30, rX + 140, rY + 30, rX + 138, rY + 35);
  // bottom right
  vertex(rX + 193, rY + 35);
  // right curve
  bezierVertex(rX + 196, rY + 30, rX + 197, rY + 20, rX + 190, rY + 17);
  // top curve
  bezierVertex(rX + 185, rY + 15, rX + 170, rY + 9, rX + 146.5, rY + 7);
  endShape(CLOSE);
}

// Youtube tutorial was used for the trees.
// Split it into the following three methods instead of one as seen in the video
// drawTree(), drawBranch(), and drawLeaf()
// (Colorful Coding, 2021, 0:45.00) https://www.youtube.com/watch?v=-3HwUKsovBE
function drawTree(locX, locY) {
  angleMode(DEGREES);
  push();
  translate(locX, locY);
  drawBranch(90);
  pop();
}

function drawBranch(len) {
  push();
  if (len > 10) {
    // strokeWeight of branches is based off the length of the branches
    strokeWeight(map(len, 10, 100, 2, 20));
    stroke(70, 40, 20);
    line(0, 0, 0, -len);
    translate(0, -len);

    // left branch
    rotate(-30);
    drawBranch(len * 0.65);

    // center branch
    rotate(30);
    drawBranch(len * 0.65);

    // right branch
    rotate(30);
    drawBranch(len * 0.65);

    drawLeaf();
  } else {
    drawLeaf();
  }
  pop();
}

function drawLeaf() {
  fill(treeGreen);
  noStroke();
  // one side of the leaves
  beginShape();
  for (let i = 45; i < 135; i++) {
    let rad = 14;
    let x = rad * cos(i);
    let y = rad * sin(i);
    vertex(x, y);
  }
  // other side of the leaves
  for (let i = 135; i > 45; i--) {
    let rad = 14;
    let x = rad * cos(i);
    let y = rad * sin(-i) + 20;
    vertex(x, y);
  }
  endShape(CLOSE);
}

// date text that is placed in the middle of the screen
function dateText(x, y) {
  textFont(carFont);
  textSize(20);
  textAlign(CENTER)
  fill(255);
  text("July 11 - 14", x, y);
  text("West Sussex, England", x, y+35);
}

function clouds() {
  let grey = color(210);

  for (let i = 0; i < cloudPositions.length; i++) {
    let cloud = cloudPositions[i];

    fill(grey);
    noStroke();
    ellipse(cloud.cX, cloud.cY, 150, 50);
    ellipse(cloud.cX - 50, cloud.cY + 25, 150, 50);
    ellipse(cloud.cX + 50, cloud.cY + 25, 150, 50);
    ellipse(cloud.cX + 20, cloud.cY + 35, 150, 50);
  }
}

// draw a tire (used x2)
function drawTire(x, y) {
  angleMode(DEGREES);
  push();
  translate(x, y);
  rotate(tireRotAngle);
  fill(black);
  noStroke();
  circle(0, 0, 62);
  fill(40);
  circle(0, 0, 30);
  stroke(yellow);
  strokeWeight(5);
  noFill();
  arc(0, 0, 46, 46, 0, 90);
  arc(0, 0, 46, 46, 180, 270);
  pop();
}
