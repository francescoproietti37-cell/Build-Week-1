const questions = [
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What does CPU stand for?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: ["Central Process Unit", "Computer Personal Unit", "Central Processor Unit"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "In the programming language Java, which of these keywords would you put on a variable to make sure it does not get modified?",
    correct_answer: "Final",
    incorrect_answers: ["Static", "Private", "Public"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "The logo for Snapchat is a Bell.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Pointers were not used in the original C programming language; they were added later on in C++.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What is the most preferred image format used for logos in the Wikimedia database?",
    correct_answer: ".svg",
    incorrect_answers: [".png", ".jpeg", ".gif"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "In web design, what does CSS stand for?",
    correct_answer: "Cascading Style Sheet",
    incorrect_answers: ["Counter Strike: Source", "Corrective Style Sheet", "Computer Style Sheet"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What is the code name for the mobile operating system Android 7.0?",
    correct_answer: "Nougat",
    incorrect_answers: ["Ice Cream Sandwich", "Jelly Bean", "Marshmallow"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "On Twitter, what is the character limit for a Tweet?",
    correct_answer: "140",
    incorrect_answers: ["120", "160", "100"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Linux was first created as an alternative to Windows XP.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "Which programming language shares its name with an island in Indonesia?",
    correct_answer: "Java",
    incorrect_answers: ["Python", "C", "Jakarta"],
  },
];

//VARIBILI GLOBALI

//Suddivido i miei oggetti con domanda e risposta in due array che contengono uno le domande, e uno le risposte

const allQuestions = questions.map((quest) => {
  return {
    question: quest.question,
    difficulty: quest.difficulty,
    type: quest.type,
  };
});

const allAnswers = questions.map((question) => {
  const answers = [];
  answers.push(question.correct_answer);
  question.incorrect_answers.forEach((incorrect) => answers.push(incorrect));
  return answers;
});

const maxQuestions = questions.length;
let currentQuestionCounter = 0;
const questionDiv = document.getElementById("question-shower");

//FINE VARIABILI GLOBALI

//Funzione che, al caricamento della pagina, caricherà il primo set di domanda/risposta
function createAnswers() {
  const currentQuestion = document.createElement("h1");
  currentQuestion.classList.add("showed-question");
  currentQuestion.innerText = allQuestions[currentQuestionCounter].question;
  questionDiv.appendChild(currentQuestion);
  const answersDiv = document.getElementById("answer-shower");
  for (let i = 0; i < allAnswers[currentQuestionCounter].length; i++) {
    const answerBlock = document.createElement("div");
    answerBlock.innerText = allAnswers[currentQuestionCounter][i];
    answerBlock.classList.add("answer");
    answersDiv.appendChild(answerBlock);
    answerBlock.addEventListener("click", (event) => {
      checkAnswer(event);
    });
  }
  const footer = document.getElementsByTagName("footer")[0];
  const footerDiv = document.createElement("div");
  const questionCounter = document.createElement("h4");
  questionCounter.classList.add("counter");
  footerDiv.appendChild(questionCounter);
  footer.appendChild(footerDiv);
  questionCounter.innerText = "QUESTION 1" + "/" + maxQuestions;
}

//Questa funzione, dopo il click, aggiornerà la domanda e le risposte visibili
function checkAnswer(event) {
  currentQuestionCounter++;
  const currentQuestion = document.querySelector(".showed-question");
  const currentAnswers = document.querySelectorAll(".answer");
  const nextAnswers = allAnswers[currentQuestionCounter];
  const questionCounter = document.querySelector(".counter");
  currentQuestion.innerText = allQuestions[currentQuestionCounter].question;
  questionCounter.innerText = "QUESTION " + (currentQuestionCounter + 1) + "/" + maxQuestions;
  questionCounter.classList.add("counterQuestion");
  for (let i = 0; i < nextAnswers.length; i++) {}
}

createAnswers();

// -- TIMER SEMPLICE --

let timeLeft = 60; // Tempo di partenza
const progressCircle = document.querySelector(".progression-circle");
const timer = setInterval(function () {
  timeLeft = timeLeft - 1; // Togli 1 secondo

  // Aggiorna il numero
  document.getElementById("countdown").innerHTML = `
    <p class="label">SECONDS</p>
    ${timeLeft}
    <p class="label">REMAINING</p>
  `;

  progressCircle.style.strokeDashoffset = 421 - (timeLeft * 421) / 60 + 2;
  // Se arriva a 0, ferma tutto
  if (timeLeft === 0) {
    clearInterval(timer);
  }
}, 1000); // Ripeti ogni 1 secondo
