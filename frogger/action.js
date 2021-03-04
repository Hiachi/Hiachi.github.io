// CREATE STUFFS
const player =   new Player(canvas.width/2      , canvas.height - 2*unit , unit    , unit , unit , unit, 'img/sheet.png'  );
const speed = 0.3;
const cars = {
                      // (startX                , startY                 , width, height , speedX,speedY, src             )
  racing1:       new Car (canvas.width - unit   , canvas.height - 3*unit , unit    , unit, -speed*2 , 0, 'img/racing.png' ),
  racing2:       new Car (canvas.width + 2*unit , canvas.height - 3*unit , unit    , unit, -speed*2 , 0, 'img/racing.png' ),
  racing3:       new Car (canvas.width + 7*unit , canvas.height - 3*unit , unit    , unit, -speed*2 , 0, 'img/racing.png' ),

  benL1:         new Car (canvas.width / 2      , canvas.height - 4*unit , unit    , unit,  speed*2 , 0, 'img/ben.png'    ),
  benL2:         new Car (1*unit                , canvas.height - 4*unit , unit    , unit,  speed*2 , 0, 'img/ben.png'    ),
  benL3:         new Car (-2*unit               , canvas.height - 4*unit , unit    , unit,  speed*2 , 0, 'img/ben.png'    ),

  car1:          new Car (canvas.width - 3*unit , canvas.height - 5*unit , unit    , unit, -speed*3 , 0, 'img/car.png'    ),
  car2:          new Car (canvas.width          , canvas.height - 5*unit , unit    , unit, -speed*3 , 0, 'img/car.png'    ),
  car3:          new Car (canvas.width + 4*unit , canvas.height - 5*unit , unit    , unit, -speed*3 , 0, 'img/car.png'    ),

  racingL1:      new Car (canvas.width / 2      , canvas.height - 6*unit , unit    , unit,  speed*3 , 0, 'img/racing2.png'),
  racingL4:      new Car (2*unit                , canvas.height - 6*unit , unit    , unit,  speed*3 , 0, 'img/racing2.png'),
  racingL3:      new Car (-2*unit               , canvas.height - 6*unit , unit    , unit,  speed*3 , 0, 'img/racing2.png'),

  truck1:        new Car (canvas.width - 5*unit , canvas.height - 7*unit , 2*unit  , unit, -speed*3 , 0, 'img/truck.png'  ),
  truck2:        new Car (canvas.width + 2*unit , canvas.height - 7*unit , 2*unit  , unit, -speed*3 , 0, 'img/truck.png'  ),
};

const logs = {
  turtlePropan1: new Log (canvas.width          , canvas.height - 9*unit , 3*unit  , unit, -speed*3 , 0, 'img/turtle3.png'),
  turtlePropan2: new Log (canvas.width -  6*unit, canvas.height - 9*unit , 3*unit  , unit, -speed*3 , 0, 'img/turtle3.png'),
  turtlePropan3: new Log (canvas.width - 12*unit, canvas.height - 9*unit , 3*unit  , unit, -speed*3 , 0, 'img/turtle3.png'),

  woodPropanL1:  new Log (0                     , canvas.height - 10*unit, 2.5*unit, unit,  speed*2 , 0, 'img/wood.png'   ),
  woodPropanL2:  new Log (-5*unit               , canvas.height - 10*unit, 2.5*unit, unit,  speed*2 , 0, 'img/wood.png'   ),
  woodPropanL3:  new Log (-10*unit              , canvas.height - 10*unit, 2.5*unit, unit,  speed*2 , 0, 'img/wood.png'   ),

  woodPentaL1:   new Log (canvas.width /2       , canvas.height - 11*unit, 5*unit  , unit, speed*3.5, 0, 'img/wood.png'   ),
  woodPentaL2:   new Log (-3*unit               , canvas.height - 11*unit, 5*unit  , unit, speed*3.5, 0, 'img/wood.png'   ),

  turtleEthan1:  new Log (canvas.width          , canvas.height - 12*unit, 2*unit  , unit, -speed*4 , 0, 'img/turtle2.png'),
  turtleEthan2:  new Log (canvas.width -  4*unit, canvas.height - 12*unit, 2*unit  , unit, -speed*4 , 0, 'img/turtle2.png'),
  turtleEthan3:  new Log (canvas.width -  8*unit, canvas.height - 12*unit, 2*unit  , unit, -speed*4 , 0, 'img/turtle2.png'),
  turtleEthan4:  new Log (canvas.width - 12*unit, canvas.height - 12*unit, 2*unit  , unit, -speed*4 , 0, 'img/turtle2.png'),

  woodButanL1:   new Log (canvas.width /2       , canvas.height - 13*unit, 4*unit  , unit, speed*2.5, 0, 'img/wood.png'   ),
  woodButanL2:   new Log (unit                  , canvas.height - 13*unit, 4*unit  , unit, speed*2.5, 0, 'img/wood.png'   ),
  woodButanL3:   new Log (-5*unit               , canvas.height - 13*unit, 4*unit  , unit, speed*2.5, 0, 'img/wood.png'   ),
};

const slots = {
  slot1:      new Ground (40                    , canvas.height - 14*unit, 80      , unit, '#1830AC'),
  slot2:      new Ground (40 + 80*1 + 50*1      , canvas.height - 14*unit, 80      , unit, '#1830AC'),
  slot3:      new Ground (40 + 80*2 + 50*2      , canvas.height - 14*unit, 80      , unit, '#1830AC'),
  slot4:      new Ground (40 + 80*3 + 50*3      , canvas.height - 14*unit, 80      , unit, '#1830AC'),
  slot5:      new Ground (40 + 80*4 + 50*4      , canvas.height - 14*unit, 80      , unit, '#1830AC'),
};

const lines = {}
for (let i = 0; i <= 3; i++) {
  lines[i] = new Line (0, canvas.height - (3+i)*unit, canvas.width, canvas.height - (3+i)*unit + i);
}

const grounds = {
  causeway2: new Ground (0, canvas.height - 8*unit, canvas.width, unit, "#8C3B1F"),
  causeway1: new Ground (0, canvas.height - 2*unit, canvas.width, unit, "#8C3B1F"),
  colpoint:  new Ground (0, canvas.height - unit   , canvas.width, unit, "black"),

  water:     new Ground (0, 20 + unit             , canvas.width, 5*unit, "#1830AC"),
  street:    new Ground (0, canvas.height - 7*unit, canvas.width, 5*unit, "black"),

  grass:     new Ground (0, 0, canvas.width, 20 + unit, "green" ),
};

// FUNCTION
function printCountPoint() {
  context.font = "800 30px Arial";
  context.fillStyle = "green";
  context.fillText(`Point: ${countPoint}`, unit/2, canvas.height - 10);
}

function printCountLive() {
  context.font = "800 30px Arial";
  context.fillStyle = "red";
  context.fillText(`Total Live: ${countLive}`, canvas.width - 4.5*unit, canvas.height - 10);
}

function arrowButton() {
    window.addEventListener('keydown', function(event){
        switch(event.keyCode) {
            case 37:
            player.moveLeft();
            break;

            case 38:
            player.moveUp();
            break;

            case 39:
            player.moveRight();
            break;

            case 40:
            player.moveDown();
            break;
        }
    });
}
arrowButton();

function printEndGame() {
  // context.globalCompositeOperation = 'destination-over';
  // context.globalCompositeOperation = 'source-over'; // 2 ảnh "canvas" đè lên nhau html
  context.fillStyle = "aqua";
  context.font = "800 40px Arial";
  context.fillText("Sorry, you lose", canvas.width / 4, canvas.height / 2 - 50);
  context.font = "800 35px Arial";
  context.fillText("Press ENTER to play again", canvas.width / 8, canvas.height / 2 + 50);
  
  window.addEventListener('keydown', function(e) {
    if(e.key == 'Enter') {
    // if(e.keyCode == 13) {
      location.reload();
    }
  });
}

function printWinGame() {
  context.fillStyle = "aqua";

  context.font = "800 40px Arial";
  context.fillText("Congratulation, You win", canvas.width / 8.2, canvas.height / 2 - 50);
  context.font = "800 35px Arial";
  context.fillText("Press ENTER to play again", canvas.width / 8, canvas.height / 2 + 50);

  window.addEventListener('keydown', function(e) {
    if(e.key == 'Enter') {
      location.reload();
    }
  });
}

// FUNCTION.UPDATE
let lastTimeStamp = 0;
function updateScreen(timeStamp) {
  // console.log(timeStamp);
  let deltaTime = timeStamp - lastTimeStamp;
  // console.log(deltaTime);  // = 60 (lần 1 giây)
  lastTimeStamp = timeStamp;

  // CLEAR THE OLD CANVAS
  context.clearRect(0,0,canvas.width,canvas.height);

  for (p in grounds) {
    grounds[p].update();
    grounds[p].draw();
  }

  for (p in lines) {
    lines[p].update();
    lines[p].draw();
  }

  for (p in slots) {
    slots[p].update(deltaTime);
    slots[p].draw();
  }

  for (p in logs) {
    logs[p].update(deltaTime);
    logs[p].draw();
  }

  for (p in cars) {
      cars[p].update(deltaTime);
      cars[p].draw();
  }

  player.update(deltaTime);
  player.draw();

  printCountPoint();
  printCountLive();

  if(countLive < 0) {
    window.cancelAnimationFrame(updateScreen);
    printEndGame();
  }

  if(countSlot == 5) {
    window.cancelAnimationFrame(updateScreen);
    printWinGame();
  }
  
  if(countLive >= 0 && countSlot < 5) {
    window.requestAnimationFrame(updateScreen);
  }
}
window.requestAnimationFrame(updateScreen);