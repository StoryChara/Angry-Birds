function start_game(){
    background(0, 0, 0);
    fill(255);
    textFont(font.Angry);
    textAlign(CENTER, CENTER);
    fill(255); stroke(0); strokeWeight(0); textSize(width/13);
    text("CLICK to Start", (width / 2), (height/2));
  }
  
function menu_intro(){
  const imgWidth = width ;
  const imgHeight = height ;
  const imgX = (width - imgWidth) / 2;
  const imgY = (height - imgHeight) / 2;
  
 // setTimeout(() => {
    image(scenarios.start, imgX, imgY, imgWidth, imgHeight);
    fill(255);
    textFont(font.Curve);
    textAlign(CENTER, CENTER);
    fill(255); stroke(0); strokeWeight(5); textSize(height / 30);
    text("Press SPACE to continue", (width / 2), ((3 * height) / 4) + 25);
  //}, 500);
}
  
function menu_story(){
  image(scenarios.story, story_x, 0, width*2, height);
  if (story_x > -width){ story_x -= 1; }
}

function level() {
    push();
    imageMode(CORNER);
    image(scenarios.sky, 0, 0, width, height);
    pop();

    push();
    imageMode(CENTER);
    image(sprites.slingshot_b, 155, 390, 50, 100);
    pop();

    Engine.update(engine);
    slingShot.fly(mc);

    ground.show();
    bird.show();
    slingShot.show();
    for (const box of boxes) {
        box.show();
    }
    for (const pig of pigs) {
        pig.show();
        if (pig.isSignificantFall()) {
            pig.reduceHealth(50); 
        }
    }

    push();
    imageMode(CENTER);
    image(sprites.slingshot_f, 155, 390, 50, 100);
    pop();
    
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
    if (birdsXgame <= 0 && pigs.some(pig => !pig.isDead)) {
       showLevelLost(score); // Continuously show level lost screen
    }
}

function menu_GameFinished(){
    push();
    imageMode(CORNER);
    image(scenarios.sky, 0, 0, width, height);
    pop();
    showGameFinished();
}
