const { Engine, World, Bodies, Body, Constraint, Mouse, MouseConstraint, Events } = Matter;
let engine, world, ground, bird, slingShot, boxes = [], pigs = [], mc;

let scenarios, sprites, music, font;
let birdsXgame = 0;
let menu = 'Start_Game';
let material_wood, material_ice, material_grass;
let story_x;
let score = 0;

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
  if (menu === 'Start_Game'){
    start_game();
  } else if (menu === 'Intro'){
    menu_intro();
  } else if (menu === "Story"){
    menu_story();    
  } else if (menu === 'Level'){
    level();
    drawResetButton(); 
    drawScore();
  }
}

function mousePressed() {
  if (menu === "Start_Game") {
    menu = "Intro";
    introMusic();
  }
} else if (isMouseOverResetButton()) {
        resetGame(); // Lógica de reinicio
}

function keyPressed(){
  if (menu === "Intro"){
    if (keyCode === 32){
      storyMusic();
      menu = "Story";
      story_x = 0;
    }
  }
}

function drawScore() {
    push();
    fill(0, 255, 0); // Verde
    stroke(0);
    strokeWeight(2);
    rect(width - 110, 10, 100, 30, 5); // Recuadro verde en la esquina superior derecha
    fill(0); // Texto negro
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(14);
    text(`Score: ${score}`, width - 60, 25); // Mostrar el puntaje actual
    pop();
}

function drawResetButton() {
    push();
    fill(255, 165, 0); // Naranja
    stroke(0);
    strokeWeight(2);
    rect(10, 10, 100, 30, 5); // Botón con bordes redondeados
    fill(0);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(14);
    text("Reiniciar", 60, 25); // Texto centrado en el botón
    pop();
}