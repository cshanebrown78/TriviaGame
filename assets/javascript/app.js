// Global Variables

var winCount = 0;
var lossCount = 0;
var noAnswerCount = 0;
var questionGen = [0,1];
var questionTimer = 30;
var intervalId;
var delay;
var delay1;
// var qs = document.getElementById('question');
// var aOne = document.getElementById("answer1");
// var aTwo = document.getElementById("answer2");
// var aThree = document.getElementById("answer3");
// var aFour = document.getElementById("answer4");
var correctAnswer = "";
var userAnswer = "";
var q = "";


var questionsAnswers = [{
    
        question: "This movie was about vampires in Santa Cruz and featured the famous Corey duo.",
        aOne: "The Lost Boys",
        aTwo: "Monster Squad",
        aThree: "Thrasher",
        aFour: "Interview with a Vampire",
        answer: "1",
        correctAnswer: "The Lost Boys",
        visual: "assets/images/thelostboys.jpg",
    },
    {
        question: "In this movie a young hotshot pilot must break all the rules to save his dad.",
        aOne: "Top Gun",
        aTwo: "Iron Eagle",
        aThree: "Flight of the Intruder",
        aFour: "Captain Silly pants",
        answer: "2",
        correctAnswer: "Iron Eagle",
        visual: "assets/images/ironeagle.jpg",
    }];


$(document).ready(function() {

    gameStart();

    // function for the intial start of the game 
    function gameStart() {
        var startBtn = $("<button>");
        startBtn.text("Start");
        $(".start").append(startBtn);
        console.log(questionGen.length)

    }

});

// function after start button is clicked and brings up initial question
$(".start").on("click", function(){
    $(".start").empty();
    randomQuestion();
});

// Generates the questions and answers
function randomQuestion() { 
    $(".image-holder, .answer-message").empty();
    $(".timer").html("<h2>Time Remaining:  30 seconds</h2>");
    var questionIndex = questionGen[Math.floor(Math.random() * questionGen.length)];  
    q = questionsAnswers[questionIndex];
    clearInterval(intervalId);
    questionTimer = 30;
    intervalId = setInterval(decrement, 1000);
    // Stores the correct answer number to compare with button number later
    correctAnswer = q.answer;
    // console.log(correctAnswer);
    // console.log(q.answer);
    // Prints the Question and Answers to the webpage
    $(".question").text(q.question);
    $(".answerOne").text(q.aOne);
    $(".answerTwo").text(q.aTwo);
    $(".answerThree").text(q.aThree);
    $(".answerFour").text(q.aFour);
    // $(".timer").html("<h2>" + questionTimer + "</h2");
    questionGen.splice($.inArray(questionIndex,questionGen), 1);
    if (questionTimer === 0) {
        $(".answer").empty();
        $(".answer-message").text("Times Up!");
        $(".image-holder").html("<img src=" + q.visual + " width = '250px'>");
    }
    
};


function decrement() {
    questionTimer--;
    // console.log(questionTimer);
    $(".timer").html("<h2>Time Remaining:  " + questionTimer + " seconds</h2");
};


$(".answer").on("click", function() {
    // Assigns the value from the button choice
    userAnswer = $(this).attr("value");
    // console.log(userAnswer);
    // Displays the image from the movie for the correct answer
    
    
    rightWrong();
});

// Determines if user chose the correct answer    
function rightWrong() {    
    if (correctAnswer === userAnswer) {
        $(".answer").empty();
        $(".answer-message").text("Totally Awesome!");
        // console.log("This worked");
        $(".image-holder").html("<img src=" + q.visual + " width = '250px'>");
        winCount++;
    } else {
        $(".answer-message").text("Bogus!");
        $(".answer").empty();
        $(".correct-answer").text("You should have chosen: " + q.correctAnswer);
        $(".image-holder").html("<img src=" + q.visual + " width = '250px'>");
        lossCount++;
    }

    if(questionGen.length > 0) {
        delay = setTimeout(randomQuestion, 3500);
    } else {
        delay = setTimeout(endGame, 3500);
        
        
    }
       

};

function endGame() {
    clearInterval(intervalId);
    $(".timer, .question, .answer, .correct-answer, .image-holder, .times-up").empty();
    $(".answer-message").text("That's All Folks. Here's how you did.");
    $(".wins").text("Wins: " + winCount);
    $(".losses").text("losses: " + lossCount);
    var reStartBtn = $("<button>");
    reStartBtn.text("Play Again");
    $(".start-over").append(reStartBtn);
}