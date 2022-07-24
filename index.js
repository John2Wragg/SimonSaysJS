var gamePattern = [];
var buttoncolours = ["red","green","blue","yellow"];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keypress(function(){
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
})

function nextSequence(){
  userClickedPattern = []; // redeclaring to empty array to input pattern
  var randomNumber = Math.floor(Math.random() * 4); // random number from 0-4

  var randomcolour = buttoncolours[randomNumber]; // index array to get random colour
  gamePattern.push(randomcolour); // add colour to array

  $("#" + randomcolour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100); // fade out pressed button

  playSound(randomcolour); // play the button's sound
  level ++; // increment level and change text in title
  $('#level-title').text("Level " + level);
}

$('.btn').click(function(){
  var userChosencolour = $(this).attr('id'); // get id for clicked button and add to user choice list pattern
  userClickedPattern.push(userChosencolour);
  playSound(userChosencolour); // play sound and animate button press with changing class
  animatePress(userChosencolour);

  checkAnswer(userClickedPattern.length-1);
})

function playSound(name){ // Playing sound from folder for the button
  audio = new Audio('sounds/' + name +'.mp3');
  audio.play()
}

function animatePress(currentcolour){
  $("#" + currentcolour).addClass('pressed')
  setTimeout(function () {
    $("#" + currentcolour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) { // check each element by element is equal
      // across both the user choices and the game correct pattern.
      if (userClickedPattern.length === gamePattern.length){ // once equal in length (all choices made) - generate
        // next sequence.
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else { // if not same colour chosen. Then wrong. change html text and sound.
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
