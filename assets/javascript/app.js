// Global Variables

var winCount = 0;
var lossCount = 0;
var noAnswerCount = 0;
var questionGen = [0,1,2,3,4,5,6,7,8,9];
var questionTimer = 30;
var intervalId;
var delay;
var correctAnswer = "";
var userAnswer = "";
var q = "";

// Object holding the questions and answers
var questionsAnswers = [{
    
        question: "This movie was about vampires in Santa Cruz and featured the famous Corey duo:",
        aOne: "The Lost Boys",
        aTwo: "Monster Squad",
        aThree: "Thrasher",
        aFour: "Interview with a Vampire",
        answer: "1",
        correctAnswer: "The Lost Boys",
        visual: "assets/images/thelostboys.jpg alt=The Lost Boys",
    },
    {
        question: "In this movie a young hot shot pilot must break all the rules to save his dad:",
        aOne: "Top Gun",
        aTwo: "Iron Eagle",
        aThree: "Flight of the Intruder",
        aFour: "Colonel Silly pants",
        answer: "2",
        correctAnswer: "Iron Eagle",
        visual: "assets/images/ironeagle.jpg alt=Iron Eagle",
    },
    {
        question: "You might find yourself travelling at ludicrous speed in this parody movie:",
        aOne: "Star Wars: The Return of the Jedi",
        aTwo: "Space Invaders",
        aThree: "Asteroids",
        aFour: "Spaceballs",
        answer: "4",
        correctAnswer: "Spaceballs",
        visual: "assets/images/spaceballs.jpg alt=Spaceballs",
    },
    {
        question: "This movie is spent trying to give BMX racer Cru a chance to race Hell Track:",
        aOne: "BMX Bandits",
        aTwo: "Quicksilver",
        aThree: "Rad",
        aFour: "Hot Dog",
        answer: "3",
        correctAnswer: "Rad",
        visual: "assets/images/rad.jpg alt=Rad",
    },
    {
        question: "If Heman gets the Power Sword, he has the Power of Grayskull in this movie:",
        aOne: "Captain Sparkle Fingers",
        aTwo: "Masters of the Universe",
        aThree: "Conan the Barbarian",
        aFour: "Zelda",
        answer: "2",
        correctAnswer: "Masters of the Universe",
        visual: "assets/images/heman.jpg alt=Masters of the Universe",
    },
    {
        question: "In this movie the story goes on and on and on and on:",
        aOne: "Titanic",
        aTwo: "Fast Times at Ridgemont High",
        aThree: "The Princess Bride",
        aFour: "The NeverEnding Story",
        answer: "4",
        correctAnswer: "The NeverEnding Story",
        visual: "assets/images/nestory.jpg alt=The NeverEnding Story",
    },
    {
        question: "If you are lucky you'll find the pirate One Eyed Willy's Treasure in this movie:",
        aOne: "Goonies",
        aTwo: "Space Pirates",
        aThree: "Ice Pirates",
        aFour: "Pirate Movie",
        answer: "1",
        correctAnswer: "Goonies",
        visual: "assets/images/goonies.jpg alt=Goonies",
    },
    {
        question: "This movie is about 2 young men who create a woman and the journey begins:",
        aOne: "Bride of Frankenstein",
        aTwo: "Weird Science",
        aThree: "The Adventures of Burt and Ernie",
        aFour: "My Science Project",
        answer: "2",
        correctAnswer: "Weird Science",
        visual: "assets/images/weirdscience.jpg alt=Weird Science",
    },
    {
        question: "This time travelling classic features 2 students travelling through history:",
        aOne: "Back to the Future",
        aTwo: "Hot Tub Time Machine",
        aThree: "Time Machine",
        aFour: "Bill and Ted's Excellent Adventure",
        answer: "4",
        correctAnswer: "Bill and Ted's Excellent Adventure",
        visual: "assets/images/bandt.jpg alt=Bill and Ted's Excellent Adventure",
    },
    {
        question: "Don't get them wet and especially don't feed them after midnight:",
        aOne: "Munchkins",
        aTwo: "Caddyshack",
        aThree: "Gremlins",
        aFour: "Little Women",
        answer: "3",
        correctAnswer: "Gremlins",
        visual: "assets/images/gremlins.jpg alt=Gremlins",
    },
];


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
    $(".question, .answer, .answer-message, .correct-answer, .image-holder, .times-up, .gameover, .final-message, .wins, .losses, .no-answer, .start-over").empty();
    $(".timer").html("<h2>Time Remaining:  30 seconds</h2>");
    var questionIndex = questionGen[Math.floor(Math.random() * questionGen.length)];  
    q = questionsAnswers[questionIndex];
    // Starts the timer
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);
    questionTimer = 30;
    // Stores the correct answer number to compare with button number later
    correctAnswer = q.answer;
    
    // Prints the Question and Answers to the webpage
    $(".question").text(q.question);
    $(".answerOne").text(q.aOne);
    $(".answerTwo").text(q.aTwo);
    $(".answerThree").text(q.aThree);
    $(".answerFour").text(q.aFour);
    
    // Removes the question from the array so that it isn't repeated
    questionGen.splice($.inArray(questionIndex,questionGen), 1);
    
        
};

// Handles the timer
function decrement() {
    questionTimer--;
    $(".timer").html("<h2>Time Remaining:  " + questionTimer + " seconds</h2");
    // Handles the times up aspect
    if (questionTimer === 0) {
        timerStop();
        $(".question, .answer").empty();
        $(".answer-message").text("Times Up!");
        $(".correct-answer").text("You should have chosen: " + q.correctAnswer);
        $(".image-holder").html("<img src=" + q.visual + " width = '200px', height = '200px'>");
        noAnswerCount++
        if(questionGen.length > 0) {
            delay = setTimeout(randomQuestion, 3000);
        } else {
            delay = setTimeout(endGame, 3000);
        };
    };    
};

// clears the timer
function timerStop() {
    clearInterval(intervalId);
};


$(".answer").on("click", function() {
    // Assigns the value from the button choice
    userAnswer = $(this).attr("value");
        
    rightWrong();
});

// Determines if user chose the correct answer    
function rightWrong() {    
    if (correctAnswer === userAnswer) {
        $(".question, .answer").empty();
        $(".answer-message").text("Totally Awesome!");
        
        // Displays the image from the movie for the correct answer
        $(".image-holder").html("<img src=" + q.visual + " width = '200px', height = '200px'>");
        winCount++;
        timerStop();
    } else {
        $(".question, .answer").empty();
        $(".answer-message").text("Bogus!");
        $(".correct-answer").text("You should have chosen: " + q.correctAnswer);
        $(".image-holder").html("<img src=" + q.visual + " width = '200px', height = '200px'>");
        lossCount++;
        timerStop();
    };

    // Part of making the timer function
    if(questionGen.length > 0) {
        delay = setTimeout(randomQuestion, 3000);
    } else {
        delay = setTimeout(endGame, 3000);

    };
       

};

// Tallies and displays the final score
function endGame() {
    clearInterval(intervalId);
    $(".timer, .question, .answer, .answer-message, .correct-answer, .image-holder, .times-up").empty();
    $(".gameover").text("That's All Folks.");
    $(".final-message").text("Here's how you did.");
    $(".wins").text("Correct: " + winCount);
    $(".losses").text("Incorrect: " + lossCount);
    $(".no-answer").text("Did not answer: " + noAnswerCount);
    $(".start-over").text("Play Again?");
};

// resets and restarts game if "Play Again?" is checked
$(".start-over").on("click", function() {
    winCount = 0;
    lossCount = 0;
    noAnswerCount = 0;
    questionGen = [0,1,2,3,4,5,6,7,8,9];
    questionTimer = 30;
    correctAnswer = "";
    userAnswer = "";
    q = "";
    $(".gameover, .final-message, .wins, .losses, .no-answer, .start-over").empty();
    randomQuestion();

});