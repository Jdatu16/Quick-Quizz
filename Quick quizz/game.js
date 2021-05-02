const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
const loader = document.getElementById("loader");
const game = document.getElementById("game");

//variables

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let avaliableQuestions = [];
let questions = [];

fetch("questions.json")
  .then((res) => {
    return res.json();
  })
  .then((loadedQuestions) => {
    questions = loadedQuestions;
    startGame();
  });

//  CONSTANTS

let MAX_QUESTIONS = 10;
let CORRECT_BONUS = 5;

// C O D E

startGame = () => {
  questionCounter = 0;
  score = 0;
  avaliableQuestions = [...questions];
  getNewQuestion();
  game.classList.remove("hidden");
  loader.classList.add("hidden");
};

getNewQuestion = () => {
  if (avaliableQuestions === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to end page
    return window.location.assign("end.html");
  }
  //question part
  questionCounter++;
  progressText.innerText = `კითხვა${questionCounter}/${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * avaliableQuestions.length);
  currenctQuestion = avaliableQuestions[questionIndex];
  question.innerText = currenctQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currenctQuestion["choice" + number];
  });

  avaliableQuestions.splice(questionIndex, 1);

  acceptingAnswers = true;
};
// answer part
choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];
    console.log(selectedAnswer);

    const luckyGuess =
      selectedAnswer == currenctQuestion.answer ? "correct" : "wrong";

    if (luckyGuess === "correct") {
      increaseScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(luckyGuess);
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(luckyGuess);
      getNewQuestion();
    }, 1000);
  });
});
// score part
increaseScore = (num) => {
  score += num;
  scoreText.innerText = score;
};
