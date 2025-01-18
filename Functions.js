let isMuted = false; // Add this line at the top of the file
let previousBirdPath = [];

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
    bird = new Bird(150, 350, 15, bird_red);
    if (birdPath.length > 0) {
        previousBirdPath = birdPath; // Store the current path as the previous path
    }
    birdPath = []; // Clear the bird path when a new bird is generated
    slingShot.attach(bird);
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
function isMouseOverSettingsButton() {
    const settingsButtonSizeW = width*0.13;
    const settingsButtonSizeH = height*0.05;
    const settingsButtonX = width*0.02;
    const settingsButtonY = height*0.02;
    return (mouseX > settingsButtonX  && mouseX < settingsButtonSizeW +settingsButtonX && mouseY > settingsButtonY  && mouseY < settingsButtonSizeH+settingsButtonY);
}

function isMouseOverResetButton() {
    const resetButtonSizeW = width*0.13;
    const resetButtonSizeH = height*0.05;
    const resetButtonX = width*0.17;
    const resetButtonY = height*0.02;
    return (mouseX > resetButtonX && mouseX < resetButtonSizeW+resetButtonX && mouseY > resetButtonY && mouseY < resetButtonSizeH+resetButtonY);
}

function isMouseOverCloseButton() {
    const closeButtonSize = width*0.05;
    const closeButtonX =  width * 0.15 - closeButtonSize * 2;
    const closeButtonY = height *0.02;
  
    return mouseX > closeButtonX && mouseX < closeButtonX + closeButtonSize &&
           mouseY > closeButtonY && mouseY < closeButtonY + closeButtonSize;
  }
  function isMouseOverMuteButton() {
    const muteButtonWidth = width*0.13;
    const muteButtonHeight = height*0.05;
    const muteButtonX = width* 0.02;
   const muteButtonY = height *0.4;

    return mouseX > muteButtonX && mouseX < muteButtonX + muteButtonWidth &&
           mouseY > muteButtonY && mouseY < muteButtonY + muteButtonHeight;
}
  
  
  function isMouseOverFullscreenButton() {
    const fullscreenButtonWidth = width*0.13;
    const fullscreenButtonHeight = height*0.05;
    const fullscreenButtonX = width* 0.02;
    const fullscreenButtonY = height *0.5; 
  
    return mouseX > fullscreenButtonX && mouseX < fullscreenButtonX + fullscreenButtonWidth &&
           mouseY > fullscreenButtonY && mouseY < fullscreenButtonY + fullscreenButtonHeight;
  }
  function isMouseOverRestartButton() {
    const rectWidth = width * 0.6;
    const rectHeight = height * 0.6;
    const rectX = (width - rectWidth) / 2;
    const rectY = (height - rectHeight) / 2;
    const buttonWidth = rectWidth * 0.3;
    const buttonHeight = rectHeight * 0.1;
    const buttonY = rectY + rectHeight - buttonHeight - 20;
    const restartButtonX = rectX + (rectWidth - buttonWidth) / 2;
    

    return mouseX > restartButtonX && mouseX < restartButtonX + buttonWidth &&
           mouseY > buttonY && mouseY < buttonY + buttonHeight;
}

function isMouseOverNextLevelButton() {
  const rectWidth = width * 0.6;
  const rectHeight = height * 0.6;
  const rectX = (width - rectWidth) / 2;
  const rectY = (height - rectHeight) / 2;
  const buttonWidth = rectWidth * 0.3;
  const buttonHeight = rectHeight * 0.1;
  const buttonY = rectY + rectHeight - buttonHeight - 20;
  const nextLevelButtonX = rectX + rectWidth - buttonWidth - 20;   
  return mouseX > nextLevelButtonX && mouseX < nextLevelButtonX + buttonWidth &&
         mouseY > buttonY && mouseY < buttonY + buttonHeight;
}
  
  function toggleMute() {
    isMuted = !isMuted;
    if (isMuted) {
        music.song.setVolume(0);
        music.se.setVolume(0);
        // Set volume to 0 for all other sounds
        for (let sound in music) {
            if (music.hasOwnProperty(sound)) {
                music[sound].setVolume(0);
            }
        }
    } else {
        music.song.setVolume(0.5);
        music.se.setVolume(0.5);
        // Restore volume for all other sounds
        for (let sound in music) {
            if (music.hasOwnProperty(sound)) {
                music[sound].setVolume(0.5);
            }
        }
    }
  }
  
  function toggleFullscreen() {
    let fs = fullscreen();
    fullscreen(!fs);
  }

  function handleCollision() {
    // Handle collision between bird and pig
  
        pigs.forEach(pig => {
            if (Matter.Collision.collides(bird.body, pig.body) != null) {
                console.log("Colisión detectada entre un pájaro y un cerdo.");
                if (pig.health > 0) {
                    pig.reduceHealth(30);
                    if (pig.isSignificantFall()) {pig.reduceHealth(20); }
                    if (pig.health <= 0) {
                        console.log("Cerdo eliminado. Incrementando puntaje.");
                        score += 5000;
                    }
                }
                if (bird.onHit) {
                   bird.onHit();
                 } 
            }
        });
  

    // Handle collision between bird and box

        boxes.forEach(box => {
            if (Matter.Collision.collides(bird.body, box.body) != null) {
                console.log("Colisión detectada entre un pájaro y una caja.");
                if (box.health > 0) {
                  box.reduceHealth(50);
                  box.onHit(); // aca se hace el cambio de sprite segun el da;o 
                  if (box.health <= 0) {
                      console.log("Caja eliminada. Incrementando puntaje.");
                      box.destroy();
                      //score += 50; // Uncomment to update score
                  }
              }
                if (bird.onHit) {
                  bird.onHit(); 
                }
            }
        });
   

    // Handle collision between pig and box
    pigs.forEach(pig => {
        boxes.forEach(box => {
            if (Matter.Collision.collides(pig.body, box.body) != null) {
                console.log("Colisión detectada entre un cerdo y una caja.");
                if (pig.isSignificantFall()){
                  pig.reduceHealth(10);
                  box.reduceHealth(15);
                } 
            }
        });
    });
}




function ajustes(){

  showSettings = !showSettings;
}
function closebuttom(){
  showSettings = false;
}
function allPigsDead() {
  return pigs.every(pig => pig.isDead);
}
function showScore(score) {
  
    
  const rectWidth = width * 0.6; // Hacer el rectángulo más grande
  const rectHeight = height * 0.6; // Hacer el rectángulo más grande
  const rectX = (width - rectWidth) / 2;
  const rectY = (height - rectHeight) / 2;

  push();
  fill(0, 0, 0, 200); // Fondo negro con transparencia
  stroke(255);
  strokeWeight(4);
  rect(rectX, rectY, rectWidth, rectHeight, 10);

  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(height*0.07);
  text("Nivel Completo", rectX + rectWidth / 2, rectY + rectHeight * 0.2);
  text(`Puntaje: ${score}`, rectX + rectWidth / 2, rectY + rectHeight / 2);

  // Botón de reiniciar
  const buttonWidth = rectWidth * 0.3; // Hacer los botones más pequeños
  const buttonHeight = rectHeight * 0.1;
  const buttonY = rectY + rectHeight - buttonHeight - 20; // Misma altura en y para ambos botones

  const restartButtonX = rectX + (rectWidth - buttonWidth) / 2;
  fill(0, 0, 255);
  rect(restartButtonX, buttonY, buttonWidth, buttonHeight);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(height*0.035);
  text("Reiniciar", restartButtonX + buttonWidth / 2, buttonY + buttonHeight / 2);

  // Botón de siguiente nivel
  const nextLevelButtonX = rectX + rectWidth - buttonWidth - 20;
  fill(0, 0, 255);
  rect(nextLevelButtonX, buttonY, buttonWidth, buttonHeight);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(height*0.035);
  text("Siguiente Nivel", nextLevelButtonX + buttonWidth / 2, buttonY + buttonHeight / 2);

  showScoreScreen = true; 

  pop();
  
}

function showLevelLost(score) {
    if (birdsXgame <= 0 && pigs.some(pig => !pig.isDead)) {
        const rectWidth = width * 0.6; // Hacer el rectángulo más grande
        const rectHeight = height * 0.6; // Hacer el rectángulo más grande
        const rectX = (width - rectWidth) / 2;
        const rectY = (height - rectHeight) / 2;

        push();
        fill(0, 0, 0, 200); // Fondo negro con transparencia
        stroke(255);
        strokeWeight(4);
        rect(rectX, rectY, rectWidth, rectHeight, 10);

        fill(255);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(height * 0.07);
        text("Nivel Perdido", rectX + rectWidth / 2, rectY + rectHeight * 0.2);
        text(`Puntaje: ${score}`, rectX + rectWidth / 2, rectY + rectHeight / 2);

        // Botón de reiniciar
        const buttonWidth = rectWidth * 0.3; // Hacer los botones más pequeños
        const buttonHeight = rectHeight * 0.1;
        const buttonY = rectY + rectHeight - buttonHeight - 20; // Misma altura en y para ambos botones

        const restartButtonX = rectX + (rectWidth - buttonWidth) / 2;
        fill(0, 0, 255);
        rect(restartButtonX, buttonY, buttonWidth, buttonHeight);
        fill(255);
        textAlign(CENTER, CENTER);
        textSize(height * 0.035);
        text("Reiniciar", restartButtonX + buttonWidth / 2, buttonY + buttonHeight / 2);

        showScoreScreen = true;

        pop();
    }
}

function launchBird() {
    birdLaunched = true;
    console.log(`Birds remaining: ${birdsXgame}`);
    setTimeout(() => {
        bird.onDead();
        World.remove(world, bird.body);
        if (birdsXgame > 0) {
            generate_Red();
            setTimeout(() => {
                birdsXgame -= 1;
            }, 5000);
        }
    }, 5000); // Remove bird and generate a new one after 5 seconds
}

function nextLevel() {
  actual_level ++;
  create_lvl(actual_level);
}      
function showGameFinished() {
  
  const rectWidth = width * 0.6;
  const rectHeight = height * 0.6;
  const rectX = (width - rectWidth) / 2;
  const rectY = (height - rectHeight) / 2;

  push();
  fill(0, 0, 0, 200); // Fondo negro con transparencia
  stroke(255);
  strokeWeight(4);
  rect(rectX, rectY, rectWidth, rectHeight, 10);
  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(32);
  text("Sos re crack", rectX + rectWidth / 2, rectY + rectHeight * 0.3);
  textSize(20);
  text("Te pasaste todo el juego", rectX + rectWidth / 2, rectY + rectHeight * 0.5);
  text("Pronto saldrán más niveles", rectX + rectWidth / 2, rectY + rectHeight * 0.7);

  showGameFinishedScreen = true;

  pop();

  // Return to intro menu after 5 seconds
  setTimeout(() => {
      //menu = 'Intro';
      //resetGame()
      
  }, 5000);
}

function drawSettingsPanel() {
    if (showSettings) {
        const panelWidth = width * 0.16;
        const panelHeight = height;
        fill(255);
        rect(0, 0, panelWidth, panelHeight);

        // Botón de cerrar (X)
        const closeButtonSizeW = width*0.13;
        const closeButtonSizeH = height*0.05;
        const closeButtonX = width* 0.02 ;
        const closeButtonY =  height *0.02;
        fill(255, 0, 0);
        stroke(0);
        strokeWeight(2);
        rect(closeButtonX, closeButtonY, closeButtonSizeW, closeButtonSizeH);
        fill(0);
        noStroke()
        textAlign(CENTER,CENTER);
        textSize(closeButtonSizeH*0.7);
        text("X", closeButtonX + closeButtonSizeW / 2,closeButtonSizeH*0.7);

        // Botón de silenciar
        const muteButtonWidth = width*0.13;
        const muteButtonHeight = height*0.05;
        const muteButtonX = width* 0.02;
        const muteButtonY = height *0.4;
        fill(0, 0, 255);
        stroke(0);
        strokeWeight(2);
        rect(muteButtonX, muteButtonY, muteButtonWidth, muteButtonHeight);
        fill(0);
        noStroke()
        textAlign(CENTER, CENTER);
        textSize(muteButtonHeight*0.7);
        text(isMuted ? "Unmute" : "Mute", muteButtonX + muteButtonWidth / 2, muteButtonY + muteButtonHeight * 0.35);

        // Botón de pantalla completa
        const fullscreenButtonWidth = width*0.13;
        const fullscreenButtonHeight = height*0.05;
        const fullscreenButtonX = width* 0.02;
        const fullscreenButtonY = height *0.5;
        fill(0, 0, 255);
        rect(fullscreenButtonX, fullscreenButtonY, fullscreenButtonWidth, fullscreenButtonHeight);
        fill(0);
        textAlign(CENTER, CENTER);
        textSize(fullscreenButtonHeight*0.35);
        text("Pantalla Completa", fullscreenButtonX + fullscreenButtonWidth / 2,fullscreenButtonY+fullscreenButtonHeight *0.35);
    }
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
