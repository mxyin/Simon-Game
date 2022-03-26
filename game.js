//global variables
var gameStarted = false;
var levelCount = 1;
var randomSequence = [];
var count = 0;
var userInputSequence = [];
var highscore = 0;
//detect press any keys
// $(document).keydown(function () {
//     if (gameStarted === false) {
//         $("#level-title").text("Level " + levelCount);
//         addNewColor();
//         gameStarted = true;
//     }
// })

$("button").on("click",function(){
    $("button").fadeToggle();
    if (gameStarted === false) {
         $("#level-title").text("Level " + levelCount);
        addNewColor();
        gameStarted = true;
    }
})

//detect click on any buttons
$(".btn").click(function () {
    if (gameStarted === false) {
        gameOver();
    } else if (gameStarted === true) {
        userInputSequence.push(colorToNumber(this.id));
        if (userInputSequence[count] === randomSequence[count]) {
            if (userInputSequence.length < randomSequence.length) {
                count++;
            } else if (userInputSequence.length === randomSequence.length) {
                count = 0;
                userInputSequence = [];
                setTimeout(nextLevelTitle, 1000, ++levelCount);
                setTimeout(addNewColor, 1000);
            }
        } else {
            gameOver();
            gameStarted = false;
            count = 0;
            if ((--levelCount) > highscore){
                highscore = levelCount;
                $("h2 p").text(highscore);
            }
            levelCount = 1;
            userInputSequence = [];
            randomSequence = [];
            $("button").fadeToggle();
        }
    }
    var colorPressed = this.id;
    $(".btn." + colorPressed).addClass("pressed");
    setTimeout(function () {
        $(".btn." + colorPressed).removeClass("pressed");
    }, 100);
    var button = new Audio("sounds/" + colorPressed + ".mp3");
    button.play();
})

function addNewColor() {
    var randomNumber = randomNumberGenerator();
    color = numberToColor(randomNumber);
    flashButtonAndPlayAudio(color);
    randomSequence.push(randomNumber);
}

function randomNumberGenerator() {
    return Math.floor(Math.random() * 4);
}

function numberToColor(n){
    switch (n) {
        case 0:
            return "green";
            break;
        case 1:
            return "red";
            break;
        case 2:
            return "yellow";
            break;
        case 3:
            return "blue";
            break;
        default:
            alert();
    }
    return color;
}

function flashButtonAndPlayAudio(color) {
    buttonClass = ".btn." + color;
    $(buttonClass).fadeOut(100).fadeIn(100);
    var button = new Audio("sounds/" + color + ".mp3");
    button.play();
}

function colorToNumber(color) {
    switch (color) {
        case "green":
            return 0;
        case "red":
            return 1;
        case "yellow":
            return 2;
        case "blue":
            return 3;
        default:
            alert();
    }
}

function nextLevelTitle(n) {
    $("#level-title").text("Level " + n);
}

function gameOver() {
    $("#level-title").text("GAME OVER");
    var errorSound = new Audio("sounds/wrong.mp3");
    errorSound.play();
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 100);
}

