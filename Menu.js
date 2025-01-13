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
    image(sprites.slingshot_b,width *0.2,height*0.75, height * 0.1,height * 0.20);
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
    image(sprites.slingshot_f,width *0.2,height*0.75, height * 0.1,height * .2);
    pop();
}
