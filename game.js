//global variables
var gameStarted = false;
var levelCount = 1;
var randomSequence = [];
//detect press any keys
$("input").keydown(function(){
    if (gameStarted === false){
        $("#level-title").text("Level " + levelCount);
        addAColor();
        gameStarted = true;
    }
})

var count = 0;
var levelCount = 1;
var userInputSequence = [];
//detect click on any buttons
$(".btn").click(function(){
    if (gameStarted === false){
        $("#level-title").text("Game Over, Press Any Key to Restart");
        var errorSound = new Audio("sounds/wrong.mp3");
        errorSound.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },100);
    }else if(gameStarted === true){
        userInputSequence.push(colorToNumber(this.id));
        if (userInputSequence[count] === randomSequence[count]){
            console.log(userInputSequence.length);
            console.log(randomSequence.length);
            if(userInputSequence.length < randomSequence.length){
                count++;
            }else if (userInputSequence.length === randomSequence.length){
                count = 0;
                userInputSequence = [];
                levelCount++;
                setTimeout(nextLevel, 1000, levelCount);
            }
        }else {
            $("#level-title").text("Game Over, Press Any Key to Restart");
            var errorSound = new Audio("sounds/wrong.mp3");
            errorSound.play();
            $("body").addClass("game-over");
            setTimeout(function(){
                $("body").removeClass("game-over");
            },100);
            gameStarted = false;
            count = 0;
            levelCount = 1;
            userInputSequence = [];
            randomSequence = [];
        }
       

    }
    switch (this.id) {
        case "green":
            $(".btn.green").addClass("pressed");
            setTimeout(function(){
                $(".btn.green").removeClass("pressed");
            },100);
            var button = new Audio("sounds/green.mp3");
            button.play();
            break;
        case "red":
            $(".btn.red").addClass("pressed");
            setTimeout(function(){
                $(".btn.red").removeClass("pressed");
            },100);
            var button = new Audio("sounds/red.mp3");
            button.play();
            break;      
        case "yellow":
            $(".btn.yellow").addClass("pressed");
            setTimeout(function(){
                $(".btn.yellow").removeClass("pressed");
            },100);
            var button = new Audio("sounds/yellow.mp3");
            button.play();
            break;
        case "blue":
            $(".btn.blue").addClass("pressed");
            setTimeout(function(){
                $(".btn.blue").removeClass("pressed");
            },100);
            var button = new Audio("sounds/blue.mp3");
            button.play();
            break;    
        default:
            alert();
    }
})

function randomNumberGenerator(){
    return Math.floor(Math.random()*4);
}

function addAColor(){
    //randomly generate a number
    var randomNumber = randomNumberGenerator();
    //flash animate the button
    flashButton(randomNumber);
    //push the number onto randomSequence[]
    randomSequence.push(randomNumber);
}

//animate randomly chosen button
function flashButton(n) {
    //for (let i = 0; i < randomSequence.length; i++) {
        switch (n) {
            case 0:
                $(".btn.green").fadeOut(100).fadeIn(100);
                var button = new Audio("sounds/green.mp3");
                button.play();
                break;
            case 1:
                $(".btn.red").fadeOut(100).fadeIn(100);
                var button = new Audio("sounds/red.mp3");
                button.play();
                break;      
            case 2:
                $(".btn.yellow").fadeOut(100).fadeIn(100);
                var button = new Audio("sounds/yellow.mp3");
                button.play();
                break;
            case 3:
                $(".btn.blue").fadeOut(100).fadeIn(100);
                var button = new Audio("sounds/blue.mp3");
                button.play();
                break;    
            default:
                alert();
        }
    //}
}

function colorToNumber(color){
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

function nextLevel(n){
    $("#level-title").text("Level " + n);
    addAColor();
}