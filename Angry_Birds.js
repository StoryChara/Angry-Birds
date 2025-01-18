const { Engine, World, Bodies, Body, Constraint, Mouse, MouseConstraint, Events } = Matter;
let engine, world, ground, bird, slingShot, boxes = [], mc;

let scenarios, sprites, music, font;
let birdsXgame = 0;
let menu = 'Start_Game';
let material_wood, material_ice, material_grass;
let story_x;
let score = 0;
let highResCanvas;
let showSettings = false;
let birdPath = [];
let birdHasCollided = false;
let birdLaunched = false;
let showScoreScreen = false;
let showGameFinishedScreen = false;

function preload(){
  scenarios = {
    start: loadImage('resources/sprites/start_game.png'),
    story: loadImage('resources/sprites/story.png'),
    game: loadImage('resources/sprites/game.png'),
    sky: loadImage('resources/sprites/sky.png')
  }
  
  sprites = {
    red: loadImage('resources/sprites/Red.png'),
    pig: loadImage('resources/sprites/piggie.png'),
    slingshot_b: loadImage('resources/sprites/slingshot_b.png'),
    slingshot_f: loadImage('resources/sprites/slingshot_f.png'),
    wood: loadImage('resources/sprites/wood.png'),
    ice: loadImage('resources/sprites/ice.png'),
    stone: loadImage('resources/sprites/stone.png'),
    grass: loadImage('resources/sprites/grass.png')
  }
  
  music = {
    song: loadSound('resources/soundtrack/title_theme.mp3'),
    se: loadSound('resources/sound_effect/level_start_military.mp3')
  }
  
  font = {
    Angry: loadFont('resources/others/angrybirds-regular.ttf'),
    Curve: loadFont('resources/others/KOMIKAX_.ttf')
  }
}

function setup() {
  const canvas = createCanvas(800, 450);
  canvas.parent('canvas-container');
  
  material_wood = { 
    img: sprites.wood, 
    opacidad: 255, 
    escala: 0.1 
  };
  
  material_ice = { 
    img: sprites.ice, 
    opacidad: 125, 
    escala: 0.1 
  };
  
  material_grass = { 
    img: sprites.grass, 
    opacidad: 255, 
    escala: 0.5 
  };
  
  engine = Engine.create();
  world = engine.world;
  
  const mouse = Mouse.create(canvas.elt);
  mouse.pixelRatio = pixelDensity();

  Matter.Events.on(engine, "collisionStart", handleCollision);
  
  mc = MouseConstraint.create(
    engine, {
    mouse:mouse,
    collisionFilter: {
      mask: 2
    }
  });
  
  World.add(world, mc);
  
  music.song.setVolume(0.5); music.song.setLoop(true);
}


function draw() {
  stroke(0); strokeWeight(1);
  if (menu === 'Start_Game') {
      start_game();
  } else if (menu === 'Story') {
      menu_story();
  } else if (menu === 'Intro') {
      menu_intro();
  } else if (menu === 'Level') {
      level();
      drawResetButton(); 
      drawScore();
      drawSettingsButton();
      drawSettingsPanel();
      if (birdLaunched && !birdHasCollided) {
          birdPath.push({ x: bird.body.position.x, y: bird.body.position.y });
      }
      drawPreviousBirdPath(); // Always draw the previous bird path
      drawBirdPath(); // Always draw the bird path
      if (allPigsDead() && !showGameFinishedScreen) { 
          showScore(score); // Mostrar el puntaje cuando todos los pigs estén muertos
          showScoreScreen = true; // Set showScoreScreen to true
      }   
      if (!showScoreScreen && showGameFinishedScreen) {
          nextLevel();  
      }
      if (birdsXgame <= 0 && pigs.some(pig => !pig.isDead)) {
          showLevelLost(score); // Continuously show level lost screen
      }
  }
}

function drawPreviousBirdPath() {
  push();
  stroke(200);
  strokeWeight(5);
  noFill();
  for (let i = 0; i < previousBirdPath.length; i++) {
      point(previousBirdPath[i].x, previousBirdPath[i].y);
  }
  pop();
}

function mousePressed() {
  if (menu === "Start_Game") {
      introMusic();
      menu = "Intro";
  } else if (isMouseOverResetButton()) {
      resetGame(); // Lógica de reinicio
  } else if (isMouseOverSettingsButton()) {
      ajustes(); // Lógica de reinicio
  } else if (showSettings) {
      if (isMouseOverCloseButton()) {
          closebuttom(); // Cerrar el panel de ajustes
      } else if (isMouseOverMuteButton()) {
          toggleMute(); // Alternar el estado de silencio
      } else if (isMouseOverFullscreenButton()) {
          toggleFullscreen(); // Alternar el estado de pantalla completa
      }
  } else if (showScoreScreen) {
      if (isMouseOverRestartButton()) {
          resetGame(); 
          showScoreScreen = false; // Reset showScoreScreen
      }
      if (isMouseOverNextLevelButton()) {
          showScoreScreen = false;
          console.log('Siguiente nivel...');
          nextLevel();
           // Reset showScoreScreen
      }
  }
}


function keyPressed(){
  if (menu === "Intro"&& keyCode === 32){
      storyMusic();
      menu = "Story";
      story_x = 0;
  }
  
  if (key === 'R' || key === 'r') {
        resetGame();
  }
 /*if (menu === 'Story' && keyCode === 32) {
      storyHoldTimer = setTimeout(() => {
          menu = 'Level';
          draw()
      }, 3000); // 3 segundos
  }*/
}


function drawScore() {
    const scoreButtonSizeW = width*0.13;
    const scoreButtonSizeH = height*0.05;
    const scoreButtonX = width*0.85;
    const scoreButtonY = height*0.02;
    push();
    fill(0, 255, 0); // Verde
    stroke(0);
    strokeWeight(2);
    rect(scoreButtonX, scoreButtonY, scoreButtonSizeW, scoreButtonSizeH, 5); // Recuadro verde en la esquina superior derecha
    fill(0); // Texto negro
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(scoreButtonSizeH*0.7);
    text(`Score: ${score}`, scoreButtonX+scoreButtonSizeW/2, scoreButtonSizeH*0.7); // Mostrar el puntaje actual
    pop();
}

function drawSettingsButton() {
    const settingsButtonSizeW = width*0.13;
    const settingsButtonSizeH = height*0.05;
    const settingsButtonX = width*0.02;
    const settingsButtonY = height*0.02;
  
    push();
    fill(0, 0, 255);
    stroke(0);
    strokeWeight(2);
    rect(settingsButtonX, settingsButtonY, settingsButtonSizeW,settingsButtonSizeH, 5);
    fill(0);
    noStroke()
    textAlign(CENTER, CENTER);
    textSize(settingsButtonSizeH*0.7);
    text("Ajustes", settingsButtonX + settingsButtonSizeW / 2, settingsButtonSizeH*0.7);
    pop();
}
function drawResetButton() {
    const resetButtonSizeW = width*0.13;
    const resetButtonSizeH = height*0.05;
    const resetButtonX = width*0.17;
    const resetButtonY = height*0.02;
  push();
  fill(255, 0, 0);
  stroke(0);
  strokeWeight(2);
  rect(resetButtonX, resetButtonY, resetButtonSizeW, resetButtonSizeH, 5);
  fill(0);
  noStroke()
  textAlign(CENTER, CENTER);
  textSize(resetButtonSizeH*0.7);
  text("Reset", resetButtonX + resetButtonSizeW / 2, resetButtonSizeH*0.7);
  pop();
}


function drawBirdPath() {
  push();
  stroke(255);
  strokeWeight(5);
  noFill();
  for (let i = 0; i < birdPath.length; i++) {
      point(birdPath[i].x, birdPath[i].y);
  }
  pop();
}

/*function handleCollision(event) {
  const pairs = event.pairs;
  for (let i = 0; i < pairs.length; i++) {
      const pair = pairs[i];
      if (pair.bodyA === bird.body || pair.bodyB === bird.body) {
          birdHasCollided = true;
      }
  }
}*/

function toggleFullscreen() {
    let fs = fullscreen();
    fullscreen(!fs);
    // if (!fs) {
    //     resizeCanvas(windowWidth, windowHeight);
    //     updateElementsSize(windowWidth, windowHeight);
    // } else {
    //     resizeCanvas(1600, 900); // Restore to original size
    //     updateElementsSize(1600, 900);
    // }
}

function updateElementsSize(newWidth, newHeight) {
    // Update the size and position of elements based on the new canvas size
    ground = new Ground(newWidth / 2, newHeight - 10, newWidth, 20, material_grass);
    
    if (bird) {
        Body.setPosition(bird.body, { x: newWidth * 0.1, y: newHeight * 0.5 });
    }

    pigs.forEach(pig => {
        Body.setPosition(pig.body, { x: pig.body.position.x * (newWidth / width), y: pig.body.position.y * (newHeight / height) });
    });

    boxes.forEach(box => {
        Body.setPosition(box.body, { x: box.body.position.x * (newWidth / width), y: box.body.position.y * (newHeight / height) });
    });

    // Update other elements similarly...
}