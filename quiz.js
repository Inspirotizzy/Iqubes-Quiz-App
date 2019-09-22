const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
    choice1: "<script>",
    choice2: "<javascript>",
    choice3: "<js>",
    choice4: "<scripting>",
    answer: 1
  },
  {
    question:
      "What is the correct syntax for referring to an external script called 'xxx.js'?",
    choice1: "<script href='xxx.js'>",
    choice2: "<script name='xxx.js'>",
    choice3: "<script src='xxx.js'>",
    choice4: "<script file='xxx.js'>",
    answer: 3
  },
  {
    question: " How do you write 'Hello World' in an alert box?",
    choice1: "msgBox('Hello World');",
    choice2: "alertBox('Hello World');",
    choice3: "msg('Hello World');",
    choice4: "alert('Hello World');",
    answer: 4
  },
  {
    question: " Why are local variable names beginning with an underscore discouraged?",
    choice1: "they are used to indicate a private variables of a class",
    choice2: "they confuse the interpreter",
    choice3: "they are used to indicate global variables",
    choice4: "they slow down execution",
    answer: 1
  },
  {
    question: " Which of the following is not a keyword?",
    choice1: "eval",
    choice2: "assert",
    choice3: "nonlocal",
    choice4: "pass",
    answer: 1
  },
  {
    question: "All keywords in Python are in",
    choice1: "lower case",
    choice2: "UPPER CASE",
    choice3: "Capitalized",
    choice4: "None of the mentioned",
    answer: 4
  },
  {
    question: "Is Python case sensitive when dealing with identifiers",
    choice1: " yes",
    choice2: "no",
    choice3: "machine dependent",
    choice4: "none of the mentioned",
    answer: 1
  },
  {
    question: "Which of the following is true for variable names in Python?",
    choice1: "Sunlimited length",
    choice2: "all private members must have leading and trailing underscores",
    choice3: "underscore and ampersand are the only two special characters allowed",
    choice4: "none of the mentioned",
    answer: 1
  },
  {
    question: " Which of the following is an invalid statement?",
    choice1: "abc = 1,000,000",
    choice2: "a b c = 1000 2000 3000",
    choice3: "a,b,c = 1000, 2000, 3000",
    choice4: "S a_b_c = 1,000,000",
    answer: 2
  },
  {
    question: "Which of the following cannot be a variable?",
    choice1: "__init__",
    choice2: "in",
    choice3: "it",
    choice4: "on",
    answer: 2
  }
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();
