let translado = 0;

function create_lvl1() {
  ground = new Ground(width/3, height *0.90,width+1000, height*0.15,material_grass);
  birdsXgame = 2;
  bird = new Bird(width *0.21, height*0.68, height * 0.033,2, sprites.red);
  slingShot = new SlingShot(bird);
  
  //translado = 250;

  // 430: limite en y
  boxes = [

    new Box(width * 0.625, height * 0.9111, width * 0.0175, height * 0.0889, material_wood),
    new Box(width * 0.6875, height * 0.8222, width * 0.0175, height * 0.2667, material_wood),
    new Box(width * 0.75625, height * 0.94, width * 0.0875, height * 0.0311, material_wood),
    new Box(width * 0.725, height * 0.8556, width * 0.0175, height * 0.1333, material_ice),
    new Box(width * 0.7875, height * 0.8556, width * 0.0175, height * 0.1333, material_ice),
    new Box(width * 0.75625, height * 0.8, width * 0.0875, height * 0.0311, material_wood),
    new Box(width * 0.8275, height * 0.8889, width * 0.0175, height * 0.2667, material_wood),
    new Box(width * 0.75625, height * 0.6667, width * 0.1625, height * 0.0311, material_wood),
    new Box(width * 0.7225, height * 0.5111, width * 0.0175, height * 0.2667, material_wood),
    new Box(width * 0.79, height * 0.5111, width * 0.0175, height * 0.2667, material_wood),
    new Box(width * 0.75625, height * 0.6222, width * 0.03125, height * 0.0311, material_wood),
    new Box(width * 0.75625, height * 0.3556, width * 0.0875, height * 0.0311, material_wood),
    new Box(width * 0.75625, height * 0.2667, width * 0.0175, height * 0.0889, material_wood),
    new Box(width * 0.8875, height * 0.9111, width * 0.0175, height * 0.0889, material_wood)
];

  
  pigs = [
    new Pig(width *0.75625,height * 0.55555 , height * 0.033, sprites.pig, 100)
  ];
  
  gameStartTime = millis();
  
}

function create_lvl() {
  ground = new Ground(width/3, height *0.90,width+1000, height*0.15,material_grass);
  birdsXgame = 2;
  bird = new Bird(width *0.2, height*0.68, height * 0.033,2, sprites.red);
  slingShot = new SlingShot(bird);
    boxes = [
         // Base amplia
         new Box(500, 420, 20, 60, sprites.stone, 255, 0.1),
        new Box(560, 420, 20, 60, sprites.stone, 255, 0.1),
        new Box(620, 420, 20, 60, sprites.stone, 255, 0.1),

        // Segundo nivel
        new Box(500, 360, 60, 60, sprites.wood, 255, 0.1),
        new Box(560, 360, 60, 60, sprites.wood, 255, 0.1),
        new Box(620, 360, 60, 60, sprites.wood, 255, 0.1),

        // Tercer nivel
        new Box(500, 300, 60, 60, sprites.ice, 255, 0.1),
        new Box(560, 300, 60, 60, sprites.ice, 255, 0.1),
        new Box(620, 300, 60, 60, sprites.ice, 255, 0.1),

        // Cuarto nivel
        new Box(500, 240, 60, 60, sprites.wood, 255, 0.1),
        new Box(560, 240, 60, 60, sprites.wood, 255, 0.1),
        new Box(620, 240, 60, 60, sprites.wood, 255, 0.1),

        // Laterales de soporte
        new Box(470, 360, 20, 140, sprites.wood, 255, 0.1),
        new Box(650, 360, 20, 140, sprites.wood, 255, 0.1),
    ];

    generatePigs();
    gameStartTime = millis();
}

function generatePigs() {
    const pigPositions = [
        { x: 560, y: 220, size: 25, health: 200}, 
        { x: 700, y: 410, size: 15, health: 100}, 
        { x: 590, y: 410, size: 15, health: 100}, 
        { x: 530, y: 410, size: 15, health: 100}, 
        { x: 420, y: 410, size: 15, health: 100}, 
    ];

    pigs = pigPositions.map(pos => new Pig(pos.x, pos.y, pos.size, sprites.pig, pos.health));
}



function resetGame() {
    Matter.World.clear(engine.world);
    Matter.Engine.clear(engine);

    birdPath = [];
    birdHasCollided = false;
    birdLaunched = false;
    showScoreScreen = false;
    showGameFinishedScreen = false;

    menu = 'Start_Game';
    pigs = [];
    boxes = [];
    bird = null;
    slingShot = null;
    score = 0;
    gameStartTime = millis();
    setup();
    menu = "Level";
    //introMusic();
    create_lvl1()
}
