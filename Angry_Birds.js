let scenarios = {}, sprites = {};
let soundtrack;
let menu = 'Start_Game';
let font;

function preload(){
  scenarios = {
    start: loadImage('resources/sprites/start_game.png')
  };
  
  AngryFont = loadFont('resources/others/angrybirds-regular.ttf');
  
  soundtrack = loadSound('resources/soundtrack/title_theme.mp3');
}

function setup() {
  const canvas = createCanvas(800, 450);
  canvas.parent('canvas-container');
  soundtrack.setVolume(0.5);
  soundtrack.setLoop(true);
}


function draw() {
  if (menu === 'Start_Game'){
    start_game();
  } else if (menu === 'Intro'){
    menu_intro();
  }
}

function mousePressed() {
  if (menu === "Start_Game") {
    menu = "Intro";
    introMusic();
  }
}
