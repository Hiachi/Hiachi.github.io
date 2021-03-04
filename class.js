const canvas = document.getElementById("target");
const context = canvas.getContext("2d");

const unit = 48;
canvas.width = 14*unit;
canvas.height = 14*unit + 20;

countPoint = 0;
countLive = 3;
countSlot = 0;

// CLASS.GROUND
class Ground {
  constructor(startX, startY, width, height, color) {
    this.x = startX;
    this.y = startY;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  draw() {
    context.beginPath();
    context.rect(this.x, this.y, this.width, this.height);
    context.fillStyle = this.color;
    context.fill();
    context.lineWidth = 1;
    // context.strokeStyle = 'green';
    // context.stroke();
  }

  update() {

  }
}

// CLASS.DashedLine
class Line {
  constructor(startX, startY, endX, endY) {
    this.x = startX;
    this.y = startY;
    this.endX = endX;
    this.endY = endY;
  }

  draw() {
    context.beginPath();
    context.strokeStyle= "white";
    context.lineWidth = 2;
    context.setLineDash([20, 20]); // length of -, space
    context.moveTo(this.x, this.y);  // coor first
    context.lineTo(this.endX, this.endY);  // coor last
    context.stroke();
  }

  update() {

  }
}

// CLASS.GAMEOBJECT
class gameObject {
  constructor(startX, startY, width, height, speedX, speedY, src) {
    this.x = startX;
    this.y = startY;
    this.width = width;
    this.height = height;
    this.speedY = speedY;
    this.speedX = speedX;
    this.img = new Image();
    this.img.src = src;
  }
}

// CLASS.CAR
class Car extends gameObject {

  draw() {
    context.drawImage(this.img, this.x, this.y, this.width, this.height );
  }

  update() {
    if(this.speedX < 0 && this.x <= -this.width) {
      this.x = canvas.width + unit;
    }
    else if(this.speedX > 0 && this.x >= canvas.width) {
      this.x = -this.width;
    }
    else {
      this.x = this.x + this.speedX;
    }

    // COLLISION car
    if((this.x + this.width > player.x) && (this.x < player.x + player.width) &&
       (this.y == player.y)) {       
      countLive -= 1;
      player.clear();
    }
  }
}

// CLASS.LOG
class Log extends gameObject {

  draw() {
    context.drawImage(this.img, this.x, this.y, this.width, this.height );
  }

  update() {
    if(this.speedX < 0 && this.x <= -this.width) {
      this.x = canvas.width + unit;
    }
    else if(this.speedX > 0 && this.x >= canvas.width) {
      this.x = -this.width;
    }
    else {
      this.x = this.x + this.speedX;
    }
  }
}

// CLASS.PLAYER  ----------------
class Player extends gameObject {
  constructor(startX, startY, width, height, speedX, speedY, src) {
    super(startX, startY, width, height, speedX, speedY, src);

    // spritesheet
    this.frameCounter = 0;
    this.frameTimeCounter = 0;

    this.animationFrames = 2;  // 2 frame img
    this.frameRate = 6;  // 6 frame/second
    this.movementDirection = "UP";
  }

  moveUp() {
    if(this.y <= 20) {
      return this.y
    }
    this.y = this.y - this.speedY;
    countPoint += 10;
    this.movementDirection = "UP";
  }

  moveDown() {
    if(this.y >= canvas.height - 96) {
      return this.y
    }
    this.y = this.y + this.speedY;
    this.movementDirection = "DOWN";
  }

  moveLeft() {
    if(this.x <= 0) {
      return this.x;
    }
    this.x = this.x - this.speedX;
    this.movementDirection = "LEFT";
  }

  moveRight() {
    if(this.x >= canvas.width - 48) {
      return this.x;
    }
    this.x = this.x + this.speedX;
    this.movementDirection = "RIGHT";
  }

  draw() {
    let animationFrameStartCoordX = 0;
    switch(this.movementDirection) {
      case "UP":
        animationFrameStartCoordX = 3;
        break;
      case "DOWN":
        animationFrameStartCoordX = 219;
        break;
      case "LEFT":
        animationFrameStartCoordX = 111;
        break;
      case "RIGHT":
        animationFrameStartCoordX = 327;
        break;
    }

    context.drawImage(this.img,
                      animationFrameStartCoordX + this.frameCounter * 54,  // sx
                      3, // sy
                      48, // swidth
                      48, // sheight
                      this.x,
                      this.y,
                      this.width,
                      this.height);
  }

  update(deltaTime) {
    this.frameTimeCounter += deltaTime;
    if(this.frameTimeCounter > 1000 / this.frameRate) {  //!!!
      this.frameTimeCounter = 0;  //!!!
      // next frame
      this.frameCounter++;  //!!!

      // check if we are at last frame, reset to the beginning
      if(this.frameCounter >= this.animationFrames) {
        this.frameCounter = 0;
      }
    }
    
    if(this.x < -unit || this.x > canvas.width) {
      countLive -= 1;
      return this.clear();
    }

    // COLLISION log
    if ((this.y < canvas.height -8*unit) && (this.y > 20)) {
      var checkLog = 0;
      for (p in logs) {
        if ((logs[p].x + logs[p].width > this.x + unit/2) &&  // (logs[p].x + logs[p].width > this.x)
            (logs[p].x + unit/2 < this.x + this.width) &&  // (logs[p].x < this.x + this.width)
            (logs[p].y == this.y)) {
          this.x = this.x + logs[p].speedX;
          return checkLog = 1;
        }
      };
      if (checkLog == 0) {
        countLive -= 1;
        this.clear();
      }
    }

    // COLLISION slot
    if (this.y == 20) {
      var checkSlot = 0;
      for (p in slots) {
        if ((slots[p].x + slots[p].width > this.x + unit) &&  // (slots[p].x + slots[p].width > this.x)
            (slots[p].x + unit < this.x + this.width) &&  // (slots[p].x < this.x + this.width)
            (slots[p].y == this.y)) {
  
          if (slots[p].color == "pink") {
            countLive -= 1;
            this.clear();
            return checkSlot = 0;
          }     
          else {
            countSlot += 1;
            slots[p].color = "pink";
            checkSlot = 1;
            this.clear();
            return checkSlot = 1;
          }
        }
      };
      if (checkSlot == 0) {
        countLive -= 1;
        this.clear();
      }
    }
  }

  clear() {
		this.x = canvas.width/2;
		this.y = canvas.height - 2*unit;
    this.speedX = unit;
    this.speedY = unit;
    this.movementDirection = "UP";
	};
}