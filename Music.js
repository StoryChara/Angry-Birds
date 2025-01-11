function playSound(){
  music.song.setLoop(true);
  music.song.play();
}

function playSE(){
  music.se.play();
}

//----------------------------------------------------------------------//

function introMusic(){
  music.song.stop();
  music.song.setPath("resources/soundtrack/title_theme.mp3", playSound);
}

//----------------------------------------------------------------------//

function birdFlySE() {
  music.se.stop();
  music.se.setPath("resources/sound_effect/bird_shot-a1.mp3", () => {
    music.se.play();
    music.se.onended(function() {
        music.se.stop();
        music.se.setPath("resources/sound_effect/bird_01_flying.mp3", () => {
            music.se.play();
            music.se.onended(function() {
              music.se.stop();
            });
        });
    });
  });
}
