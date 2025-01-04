function playSound(){
  soundtrack.setLoop(true);
  soundtrack.play();
}

function introMusic(){
  soundtrack.stop();
  soundtrack.setPath("resources/soundtrack/title_theme.mp3", playSound);
}
