function start_game(){
  background(0, 0, 0);
  fill(255);
  textFont(font.Angry);
  textAlign(CENTER, CENTER);
  fill(255); stroke(0); strokeWeight(0); textSize(10);
  text("CLICK to Start", (width / 2), (height/2));
}

function menu_intro(){
  image(scenarios.start, 0, 0);
}

function level(){
  //background (128);
  push();
  imageMode(CORNER);
  image(scenarios.sky, 0, 0, width, height)
  pop();
  
  push(); imageMode(CENTER); image(sprites.slingshot_b, 155, 390, 50, 100); pop();
  
  
  Engine.update(engine);
  slingShot.fly(mc);
  
  ground.show();
  bird.show();
  slingShot.show();
  for (const box of boxes){ box.show(); }
  
  push(); imageMode(CENTER); image(sprites.slingshot_f, 155, 390, 50, 100); pop();

}
