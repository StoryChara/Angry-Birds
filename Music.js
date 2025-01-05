function playSound(){
  music.song.setLoop(true);
  music.song.play();
}

function introMusic(){
  music.song.stop();
  music.song.setPath("resources/soundtrack/title_theme.mp3", playSound);
}
