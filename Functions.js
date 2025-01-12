function createPattern(img, w, h, scaleFactor = 1) {
  let pg = createGraphics(w, h); // Lienzo del patrón
  let scaledWidth = img.width * scaleFactor; // Ancho reducido
  let scaledHeight = img.height * scaleFactor; // Alto reducido

  for (let x = 0; x < w; x += scaledWidth) {
    for (let y = 0; y < h; y += scaledHeight) {
      pg.image(img, x, y, scaledWidth, scaledHeight); // Imagen escalada
    }

  }
  return pg; // Retornar el patrón generado
}

function generate_Red(){
  bird = new Bird(150, 350, 15, 2, sprites.red);
  slingShot.attach(bird);
  birdsXgame -= 1;
}

function remove_Red(){
  World.remove(world, bird.body);
  if (birdsXgame < 0){
    generate_Red();
  }
  else{
    log.console("continue");
  }
}


function isMouseOverResetButton() {
    return mouseX > 10 && mouseX < 110 && mouseY > 10 && mouseY < 40;
}

function handleCollision(event) {
    event.pairs.forEach(({ bodyA, bodyB }) => {
        pigs.forEach(pig => {
            if (bodyA === pig.body || bodyB === pig.body) {
                console.log(`Colisión detectada con un cerdo. Salud actual: ${pig.health}`);
                if (pig.health > 0) {
                    pig.reduceHealth(25);
                    pigDamageSE();
                    if (pig.health <= 0) {
                        console.log("Cerdo eliminado. Incrementando puntaje.");
                        score += 5000;
                        pig.show_score();
                    }
                }
            }
        });
    });
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
