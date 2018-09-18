// arrays for questions and answers
var game = {
    questions: ["Question 1: What year did Michael Jordan join the Chicago Bulls?", "Question 2: what College did Michael Jordan play for?", "Question 3: How many titles did Michael Jordan win with the Chicago Bulls?", "Question 4: How many years did Michael Jordan play for the Chicago Bulls?", "Question 5: Who won the same amount of titles as Jordan with the Bulls?"],
    answer1: ["1984", "Duke University", "4", "6 years", "Lebron James"],
    answer2: ["1990", "University of North Carolina", "2", "10 years", "Kobe Bryant"],
    answer3: ["2000", "University of Illinois", "10", "14 years", "Scottie Pippen"],
    answer4: ["1975", "NC State Univerity", "6", "20 years", "Dennis Rodman"],
    correctanswer: ["1", "2", "4", "3", "3"]
}

var wins = 0;
var losses = 0;
var timer = 16;
var count = 0;
var intervalId;
var timeset;

// when screen loads. hide question and answer divs

$("#start").show()
$("#question").hide()
$("#answer-container").hide()
$("#time-left").hide()
$("#result-update").hide()

// Function for startgame to show answers and start game
function startGame() {
    $("#start").hide();
    $("#time-left").show();
    $("#question").show();
    $("#answer-container").show();
    $("#result-update").hide()
}

$("#start-btn").on("click", function () {
    displayQuestion();
    answerFunc();
})

// result screen
function result(winOrLose) {
    $("#start").hide()
    $("#question").hide()
    $("#answer-container").hide()
    $("#time-left").hide()
    $("#result-update").show()
    $("#update").text("You: " + winOrLose)
}

function reset() {
    displayQuestion();
    answerFunc();
    timer = 16;
    decrement();
}

// Display question
function displayQuestion() {
    startGame()
    $(".question-holder").html(game.questions[count]);
}

// getting answers from object using value instead of refrencing by index
function answerFunc() {
    $("#answer1").html(game.answer1[count]);
    $("#answer2").html(game.answer2[count]);
    $("#answer3").html(game.answer3[count]);
    $("#answer4").html(game.answer4[count]);
}

$(".answer").on("click", function () {
    if (game.correctanswer[count] === $(this).val()) {
        wins++;
        result("Win");
    } else {
        losses++;
        result("Lose");
    }
    count++;
    timeset = (setTimeout(reset, 2000))

    if (count === game.questions.length) {
        clearTimeout(timeset);
        gameOver();
    }
})


// timer function
function decrement() {
    timer--;
    $("#time").html("<h3> Time Left: " + timer + "</h3>");
    if (timer === 0) {
        lose()
    }
}

function run() {
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);
}

//  The stop function
function lose() {
    losses++;
    result("Lose Out of Time");
    count++;
    timeset(setTimeout(reset, 2000))
    if (count === game.questions.length) {
        clearTimeout(timeset);
        gameOver();
    }
    
}

function gameOver() {
    $("#start").hide()
    $("#question").hide()
    $("#answer-container").hide()
    $("#time-left").hide()
    $("#result-update").show()
    $("#update").text("Wins: " + wins + " Losses: " + losses)
}   

    



run();
