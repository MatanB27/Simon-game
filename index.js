// Variables
var buttonColors = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userClickedPattern = [];
var audio;
var level = 0;


// First init start when a key is pressed.
var isPlaying = false;
$(document).keydown(function() {
  if (!isPlaying) {
    console.log('Start');
    nextSequence();
    $('h1').text('level '+ level);
  }
  isPlaying = true;
});

function nextSequence() {
  level++;
  $('h1').text('level '+ level);
  var rand = Math.floor((Math.random() * 4));
  var randColor = buttonColors[rand];


    useAnimation(randColor);
    playSound(randColor);

  setTimeout(function() {
    $('.'+randColor).removeClass('pressed');
  }, 100);
  gamePattern.push(randColor);
  userClickedPattern = [];

}

function startOver(){
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  isPlaying = false;
}

function checkAnswer(currentLevel){
  console.log(userClickedPattern[currentLevel]);
  console.log(gamePattern[currentLevel]);
  if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){

    if (userClickedPattern.length === gamePattern.length){
      console.log('going next level...');
      setTimeout(function () {
        nextSequence();
      }, 1000);

    }
  }else{ // Removing class
    $('body').addClass('game-over');
    $('h1').text('Game over, Press any key to start');
    setTimeout(function () {
      $('body').removeClass('game-over');
    }, 200);
    startOver();
  }
}



// animation when pressed;
$('.btn').click(function(event) {

  useAnimation(event.target.getAttribute('id'));
  playSound(event.target.getAttribute('id'));
  var userColor = event.target.getAttribute('id');
  userClickedPattern.push(userColor);

  setTimeout(function() {
    $('.btn').removeClass('pressed');
  }, 100);
  checkAnswer(userClickedPattern.length - 1);
});

// Use animation when clicked
function useAnimation(color){
  $('.' + color).addClass('pressed');
}

// Use sounds when clicked
function playSound(sound){
  audio = new Audio('sounds/' + sound + '.mp3');
  audio.play();
}
