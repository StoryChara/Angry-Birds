function start_game(){
  background(0, 0, 0);
  fill(255);
  textFont(AngryFont);
  textAlign(CENTER, CENTER);
  fill(255); stroke(0); strokeWeight(0); textSize(10);
  text("CLICK to Start", (width / 2), (height/2));
}

function menu_intro(){
  image(scenarios.start, 0, 0);
}
