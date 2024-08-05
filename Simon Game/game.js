var buttonColours = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];

var gamePattern = [];

var started = false;

var level = 0;

$(document).on("keydown", function () {
    if (!started) {

        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;

    }
});


$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer (currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("succes");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {

    playSound("wrong");
 
    $(document.body).addClass("game-over");
    setTimeout(function () {
        $(document.body).removeClass("game-over");
    }, 200)

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
}
} 

function startOver () {
    level = 0;
    gamePattern = [];
    started = false;
}

function nextSequence() {

    level++;
    $("#level-title").text("Level " + level)

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

    userClickedPattern = [];
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    var button = $("#" + currentColour);
    button.addClass("pressed");

  setTimeout(function () {
    button.removeClass("pressed");
  }, 100);
}
