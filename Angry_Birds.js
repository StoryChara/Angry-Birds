const {Engine, World, Bodies, Body, Constraint, Mouse, MouseConstraint} = Matter;
let engine, world, ground, bird, slingShot, boxes = [], pigs = [], mc;

let scenarios, sprites, music, font;
let birdsXgame = 0;
let menu = 'Start_Game';
let material_wood, material_ice, material_grass;

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
  } else if (menu === 'Level'){
    level();
  }
}

function mousePressed() {
  if (menu === "Start_Game") {
    menu = "Intro";
    introMusic();
  }
}

function keyPressed(){
  if (menu === "Intro"){
    if (keyCode === 32){
      menu = "Level";
      create_lvl1();
    }
  }
}
