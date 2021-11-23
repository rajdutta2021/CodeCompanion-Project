// Defining object constructor for Quiz
function Quiz(questions) {
    // Properties
    this.questionIndex = 0;
    this.score = 0;
    // Array of question objects
    this.questions = questions;
    
    // Methods
    // Return current question
    this.getQuestion = function() {
        return this.questions[this.questionIndex];
    };

    // Checking if correct answer: If yes, increment score. Increment question in either case.
    this.guess = function(answer) {
        if(this.getQuestion().isCorrectAnswer(answer)) {
            this.score++;
        }
        this.questionIndex++;
    };

    // Checking if all quiz has ended
    this.isEnded = function() {
        return this.questionIndex === this.questions.length;
    }
}

function Question(question, options, answer) {
    // Properties
    this.question = question;
    this.options = options;
    this.answer = answer;

    // Methods
    this.isCorrectAnswer = function(choice) {
        return this.answer === choice;
    };
}

// Adding event listeners to each button
var optionButtons = document.querySelectorAll(".option-buttons");
for(var i=0; i<optionButtons.length; i++) {
    optionButtons[i].addEventListener("click", function() {
        quiz.guess(this.innerHTML);
        playQuiz();
    });
}

// Driving function for the game
function playQuiz() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        var currentQuestion = quiz.getQuestion();
        document.querySelector(".question").innerHTML = currentQuestion.question;
        
        for(var i=0; i<currentQuestion.options.length; i++) {
            document.querySelector("#choice" + i).innerHTML = currentQuestion.options[i];
        }
    }
}

// Show the scores
function showScores() {

    // Removing the question panel
    document.querySelector("#quiz-setup").remove();

    var result = document.querySelector('#result');
    
    if(quiz.score === 5) {
        result.innerHTML = "Congratulations! You got a perfect score!" + 
        " Get a perfect score consecutively for a week and get 40% off on pro!";
    }
    else if(quiz.score === 0) {
        result.innerHTML = "Oops! Try again!"
    }
    else {
        result.innerHTML = "Good job! Your score is: " + quiz.score;
    }
}

// Question set
var questions = [
    new Question("Who invented JavaScript?", ["Brendan Eich", "Ryan Dahl","Guido Van Rossum", "James Gosling"], "Brendan Eich"),
    new Question("Which language is used for styling web pages?", ["HTML", "JQuery", "CSS", "XML"], "CSS"),
    new Question("Which is not a JavaScript Framework?", ["Angular", "JQuery","Django", "Node"], "Django"),
    new Question("Which is used for Connect To Database?", ["PHP", "HTML", "JS", "All"], "PHP"),
    new Question("How long did it take to build JavaScript>", ["14 days", "10 days", "7 days", "12 days"], "10 days")
];

// Quiz object
var quiz = new Quiz(questions);

// Initializing game...
playQuiz();