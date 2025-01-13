let translado = 0;

function create_lvl1() {
  ground = new Ground(width/2, height-10,
                      width+500, 20, material_grass);
  birdsXgame = 3;
  bird = new Bird(150, 350, 15, 2, sprites.red);
  slingShot = new SlingShot(bird);
  
  //translado = 250;

  // 430: limite en y
  boxes = [
    new Box(500+translado, 410,  14,  40, material_wood), 
    new Box(550+translado, 370,  14, 120, material_wood),
    new Box(605+translado, 423,  70,  14, material_wood),
    new Box(580+translado, 385,  14,  60, material_ice),
    new Box(630+translado, 385,  14,  60, material_ice),
    new Box(605+translado, 360,  70,  14, material_wood),
    new Box(662+translado, 400,  14, 120, material_wood),
    new Box(605+translado, 300, 130,  14, material_wood),
    new Box(578+translado, 230,  14, 120, material_wood),
    new Box(632+translado, 230,  14, 120, material_wood),
    new Box(605+translado, 280,  25,  14, material_wood),
    new Box(605+translado, 160,  70,  14, material_wood),
    new Box(605+translado, 120,  14,  40, material_wood),
    new Box(710+translado, 410,  14,  40, material_wood), 
  ];
  
  pigs = [
    new Pig(605+translado, 250, 15, sprites.pig, 100)
  ];
  
  gameStartTime = millis();
  
}

function create_lvl() {
    ground = new Ground(width / 2, height - 10, width, 20, sprites.grass, 255, 0.5);
    birdsXgame = 3;
    bird = new Bird(150, 350, 15, 2, sprites.red);
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

function keyPressed() {
    
}

function resetGame() {
    Matter.World.clear(engine.world);
    Matter.Engine.clear(engine);

    menu = 'Start_Game';
    pigs = [];
    boxes = [];
    bird = null;
    slingShot = null;
    score = 0;
    gameStartTime = millis();
    setup();
    menu = "Level";
    create_lvl1()
}
