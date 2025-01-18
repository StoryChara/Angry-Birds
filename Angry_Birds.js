const { Engine, World, Bodies, Body, Constraint, Mouse, MouseConstraint, Events } = Matter;
let engine, world, ground, bird, slingShot, boxes = [], pigs = [],  mc;

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
let actual_level = 1;

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
  
  wood_damaged = loadSound('resources/sound_effect/wood_collision.mp3');
  wood_destroy = loadSound('resources/sound_effect/wood_destroyed.mp3');
  
  ice_damaged = loadSound('resources/sound_effect/ice_collision.mp3');
  ice_destroy = loadSound('resources/sound_effect/ice_destroyed.mp3');
  
  stone_damaged = loadSound('resources/sound_effect/rock_collision.mp3');
  stone_destroy = loadSound('resources/sound_effect/rock_destroyed.mp3');
  
  pig_damaged = loadSound('resources/sound_effect/piglette_damage.mp3');
  pig_destroy = loadSound('resources/sound_effect/piglette_destroyed.mp3');
  
  red_damaged = loadSound('resources/sound_effect/bird_01_collision.mp3');
  red_destroy = loadSound('resources/sound_effect/bird_destroyed.mp3');
}

function setup() {
  const canvas = createCanvas(800, 450);
  canvas.parent('canvas-container');
  
  material_wood = { 
    img: sprites.wood, 
    opacidad: 255, 
    escala: 0.1,
    health: 100,
    damaged: wood_damaged,
    destroy: wood_destroy
  };
  
  material_ice = { 
    img: sprites.ice, 
    opacidad: 125, 
    escala: 0.1,
    health: 75,
    damaged: ice_damaged,
    destroy: ice_destroy
  };
  
  material_stone = { 
    img: sprites.stone, 
    opacidad: 255, 
    escala: 0.1,
    health: 125,
    damaged: stone_damaged,
    destroy: stone_destroy
  };
  
  material_grass = { 
    img: sprites.grass, 
    opacidad: 255, 
    escala: 0.5,
    health: 9999999999999999
  };
  
  pig_normal = {
    img: sprites.pig,
    health: 100,
    damaged: pig_damaged,
    destroy: pig_destroy
  };
  
  bird_red = {
    mass: 2,
    img: sprites.red,
    damaged: red_damaged,
    destroy: red_destroy
  }
  
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
  
  if (menu === "Level"){
    if (key === 'R' || key === 'r') {
          resetGame();
    }
  }
  
}
