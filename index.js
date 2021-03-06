const healthBar = document.querySelector("progress");
const [canvasWidth, canvasHeight] = [800, 600];
const ghostColors = ["red", "cyan", "pink", "orange"];
let scoreCounter = 0;
let counterInMilliseconds = 0;
let timePassed = 0;
const font = "chalkduster";
const fontsize = 60;

class pacmanCharacter {
  constructor(x, y, color, radius, speed) {
    Object.assign(this, { x, y, color, radius, speed });
  }
  draw() {
    fill(this.color);
    ellipse(this.x, this.y, this.radius * 2);
    fill("black");
    triangle(
      this.x,
      this.y,
      this.x + 20,
      this.y - 10,
      this.x + 20,
      this.y + 10
    );
  }
  move(target) {
    this.x += (target.x - this.x) * this.speed;
    this.y += (target.y - this.y) * this.speed;
  }
}

class ghostCharacter {
  constructor(x, y, color, radius, speed) {
    Object.assign(this, { x, y, color, radius, speed });
  }
  draw() {
    fill(this.color);
    arc(this.x, this.y, this.radius * 2, this.radius * 2, PI, 0);
    rect(this.x - this.radius, this.y, this.radius * 2, this.radius);
    fill("black");
    rect(this.x - 12, this.y - 2, 6, 6);
    rect(this.x + 6, this.y - 2, 6, 6);
    rect(this.x - 14, this.y + 15, 28, 2);
  }
  move(target) {
    this.x += (target.x - this.x) * this.speed;
    this.y += (target.y - this.y) * this.speed;
  }
}

const player = new pacmanCharacter(400, 400, "yellow", 20, 0.04);
let enemies = [];
let scarecrow;

function addGhost() {
  const numberOfEnemiesAdded = 1;
  let startLocation = [
    Math.random() * canvasWidth,
    Math.random() * canvasHeight
  ];
  let color = ghostColors[Math.floor(Math.random() * ghostColors.length)];
  const size = 25;
  let speed = Math.random() * 0.0175 + 0.0175;
  for (let i = 0; i < numberOfEnemiesAdded; i++) {
    enemies.push(
      new ghostCharacter(
        startLocation[0] + i,
        startLocation[1],
        color,
        size,
        speed
      )
    );
  }
}

function adjustCharacterPosition() {
  const characters = [player, ...enemies];
  for (let i = 0; i < characters.length; i++) {
    for (let j = i + 1; j < characters.length; j++) {
      pushOff(characters[i], characters[j]);
    }
  }
}

function pushOff(c1, c2) {
  let [dx, dy] = [c2.x - c1.x, c2.y - c1.y];
  const distance = Math.hypot(dx, dy);
  let overlap = c1.radius + c2.radius - distance;
  if (overlap > 0) {
    const adjustX = overlap / 2 * (dx / distance);
    const adjustY = overlap / 2 * (dy / distance);
    c1.x -= adjustX;
    c1.y -= adjustY;
    c2.x += adjustX;
    c2.y += adjustY;
  }
}

function distanceBetween(player, enemy) {
  return Math.hypot(player.x - enemy.x, player.y - enemy.y);
}

function playerCollision(player, enemy) {
  return distanceBetween(player, enemy) < player.radius + enemy.radius;
}

function increaseScore() {
  const score = document.querySelector("#score");
  counterInMilliseconds++;
  if (counterInMilliseconds % 10 === 0) {
    scoreCounter++;
  }
  score.innerHTML = scoreCounter;
}

function mouseClicked() {
  if (!scarecrow) {
    scarecrow = new pacmanCharacter(player.x, player.y, "white", 20);
    scarecrow.ttl = frameRate() * 5;
  }
}

function keyPressed() {
  if (healthBar.value < 50) {
    enemies.splice(0, enemies.length / 2);
    player.speed -= 0.005;
  }
}

function gameOver() {
  fill("white");
  text("Game Over", 400, 300);
  noLoop();
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  noStroke();
  textFont(font);
  textSize(fontsize);
  textAlign(CENTER, CENTER);

  addGhost(
    1,
    [Math.random() * canvasWidth, Math.random() * canvasHeight],
    ghostColors[Math.floor(Math.random() * ghostColors.length)],
    25,
    0.025
  );
}

function draw() {
  background("black");
  player.draw();
  player.move({ x: mouseX, y: mouseY });
  enemies.forEach(enemy => enemy.draw());
  enemies.forEach(enemy => enemy.move(scarecrow || player));
  adjustCharacterPosition();
  enemies.forEach(enemy => {
    if (playerCollision(enemy, player)) {
      healthBar.value -= 1;
    }
  });
  timePassed++;
  if ((Math.round(timePassed) / 10) % 15 === 0) {
    addGhost();
  }
  if (scarecrow) {
    scarecrow.draw();
    scarecrow.ttl--;
    if (scarecrow.ttl < 0) {
      scarecrow = undefined;
    }
  }
  if (healthBar.value > 0) {
    increaseScore();
  } else {
    gameOver();
  }
}
