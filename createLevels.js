function create_lvl1() {
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
    if (key === 'R' || key === 'r') {
        resetGame();
    }
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
    introMusic();
    create_lvl1()
}