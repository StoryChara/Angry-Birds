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

function storyMusic(){
  music.song.stop();
  music.song.setLoop(false);
  music.song.setPath("resources/soundtrack/birds_intro.mp3", () => {
    music.song.play();
    music.song.onended(function () {
      menu = "Level";
      create_lvl(actual_level);
      levelMusic();
    });
  });
}

function winGameMusic(){
  music.song.stop();
  music.song.setLoop(false);
  music.song.setPath("resources/soundtrack/game_complete.mp3", () => {
    music.song.play();
    music.song.onended(function () {
      music.song.stop();
    });
  });
}

function levelMusic(){
  music.song.stop();
  music.song.setPath("resources/soundtrack/ambient_white_dryforest.mp3", playSound);
}

//----------------------------------------------------------------------//

function startLevelSE() {
  music.se.stop();
  music.se.setPath("resources/sound_effect/bird_next_military.mp3", playSE);
}

function birdFlySE() {
  music.se.stop();
  music.se.setPath("resources/sound_effect/bird_shot.mp3", () => {
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
