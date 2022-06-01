//This script was given as starter code by the instructor

//variables that reference DOM Ids
var questionsEl = document.getElementById("questions");
var questionTitleE1 = document.getElementById("question-title");
var choicesE1 = document.getElementById("choices");
var questionResultEl = document.getElementById("question-result");
var timerEl = document.getElementById("time");
var startButton = document.getElementById("start");
var submitButton = document.getElementById("submit");
var initialsE1 = document.getElementById("initials");


var questionIndex = 0;
var correctCount = 0;
var time = questions.length * 10;
var intervalId;

function startQuiz() {

  //hide main screen
  var startingScreenE1 = document.getElementById("starting-screen")
  startingScreenE1.setAttribute("class", "hide");
  //unhide questions

  questionsEl.removeAttribute("class");

  
  timerEl.textContent = time;

  renderQuestion();
}

function endQuiz() {
  clearInterval(intervalId);
  var body = document.body;
  body.innerHTML = "Game over, You scored " + correctCount;
}

function updateTime() {
  time--;
  timerEl.textContent = time;
  if (time <= 0) {
    endQuiz();
  }
}

function renderQuestion() {
  
  if (time == 0) {
    updateTime();
    return;
  }

  intervalId = setInterval(updateTime, 1000);
  
  questionTitleE1.textContent = questions[questionIndex].question;

  choicesE1.innerHTML = "";
  questionResultEl.innerHTML = "";

  var choices = questions[questionIndex].choices;
  var choicesLength = choices.length;

  for (var i = 0; i < choicesLength; i++) {
    var questionListItem = document.createElement("button");
    questionListItem.textContent = choices[i];
    choicesE1.append(questionListItem);
  }
}

function nextQuestion() {
  questionIndex++;
  if (questionIndex === questions.length) {
    time = 0;
  }
  renderQuestion();
}

function checkAnswer(event) {
  clearInterval(intervalId);
  if (event.target.matches("li")) {
    var answer = event.target.textContent;
    if (answer === questions[questionIndex].answer) {
      questionResultEl.textContent = "Correct";
      correctCount++;
    } else {
      questionResultEl.textContent = "Incorrect";
      time = time - 2;
      timerEl.textContent = time;
    }
  }
  setTimeout(nextQuestion, 2000);
}



choicesE1.addEventListener("click", checkAnswer);

startButton.onclick = startQuiz;
