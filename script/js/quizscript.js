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
    question:
      "In the programming language Java, which of these keywords would you put on a variable to make sure it does not get modified?",
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
    question:
      "Pointers were not used in the original C programming language; they were added later on in C++.",
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

//VARIABILI GLOBALI
const maxQuestions = questions.length;
let currentQuestionCounter = 0;
let points = 0;

// timer
let timeLeft = 60;
let timerInterval = null;

//FUNZIONE PER VEDERE DOMANDE E RISPOSTE
function showQuestion() {
  // svuoto tutto
  const questionDiv = document.getElementById("question-shower");
  const answersDiv = document.getElementById("answer-shower");

  //Con questo check, verifico su che pagina lo sto utilizzando
  if (questionDiv === null) return;

  questionDiv.innerHTML = "";
  answersDiv.innerHTML = "";

  // DOMANDA
  const questionTitle = document.createElement("h1");
  questionTitle.innerText = questions[currentQuestionCounter].question;
  questionDiv.appendChild(questionTitle);

  // RISPOSTE (corrette + sbagliate) - MESCOLATE
  const answers = [
    questions[currentQuestionCounter].correct_answer,
    ...questions[currentQuestionCounter].incorrect_answers,
  ];

  // Mescola le risposte in ordine casuale
  answers.sort(() => Math.random() - 0.5);

  answers.forEach((answerText) => {
    const button = document.createElement("button");
    button.innerText = answerText;
    button.classList.add("answer");
    applyCorrect(answerText, button);

    button.addEventListener("click", () => {
      handleAnswerClick(button);
    });

    answersDiv.appendChild(button);
  });

  // AGGIUNGI COUNTER DOMANDE
  updateQuestionCounter();

  // riavvio timer
  startTimer();
}

//AGGIORNA IL COUNTER DELLE DOMANDE
function updateQuestionCounter() {
  let counterDiv = document.querySelector("footer");

  // Aggiorna il contenuto
  counterDiv.innerHTML = `
    <h3 class="counter">
      QUESTION <span class="current">${currentQuestionCounter + 1}</span>
      <span class="separator">/</span>
      <span class="total">${maxQuestions}</span>
    </h3>
  `;
}

//UNA SOLA RISPOSTA SELEZIONABILE
function handleAnswerClick(clickedButton) {
  const allButtons = document.querySelectorAll(".answer");

  // tolgo "selected" a tutti
  allButtons.forEach((btn) => {
    btn.classList.remove("selected");
  });

  // aggiungo solo a quello cliccato
  clickedButton.classList.add("selected");

  checkIfCorrect(clickedButton);

  // dopo 600ms passo alla prossima domanda
  setTimeout(nextQuestion, 600);
}

//PASSARE ALLA DOMANDA SUCCESSIVA
function nextQuestion() {
  currentQuestionCounter++;

  if (currentQuestionCounter < maxQuestions) {
    showQuestion();
  } else {
    clearInterval(timerInterval);

    //Se ho finito, creo i risultati
    const results = createResultsToPass();
    console.log(results);

    const stringForUrl = JSON.stringify(results);
    const url = "/result.html?risultatiTest=" + stringForUrl;
    // Reindirizza alla pagina dei risultati
    window.location.href = url;
  }
}

//Funzione che applica la classe "correct" alla risposta giusta per il calcolo dei punti
function applyCorrect(answer, button) {
  const correctAnswers = questions.map((question) => question.correct_answer);
  correctAnswers.forEach((correct) => {
    if (correct === answer) {
      button.classList.add("correct");
    }
  });
}

//Funzione che controlla se il bottone clickato contiene la risposta giusta e aggiunge un punto
function checkIfCorrect(button) {
  if (button.classList.contains("correct")) {
    points++;
  }
}

function createResultsToPass() {
  const results = {
    totalQuestions: maxQuestions,
    rightQuestions: points,
    wrongQuestions: maxQuestions - points,
  };
  return results;
}

//TIMER CHE RIPARTE AD OGNI DOMANDA
function startTimer() {
  clearInterval(timerInterval); // ferma il vecchio timer
  timeLeft = 60;

  const countdown = document.getElementById("countdown");
  const progressCircle = document.querySelector(".progression-circle");

  // Aggiorna subito il primo valore
  countdown.innerHTML = `
    <p class="label">SECONDS</p>
    ${timeLeft}
    <p class="label">REMAINING</p>
  `;

  timerInterval = setInterval(() => {
    timeLeft--;

    countdown.innerHTML = `
      <p class="label">SECONDS</p>
      ${timeLeft}
      <p class="label">REMAINING</p>
    `;

    progressCircle.style.strokeDashoffset = 421 - (timeLeft * 421) / 60;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      nextQuestion(); // se finisce il tempo, vai avanti
    }
  }, 1000);
}

//AVVIO DEL QUIZ
showQuestion();
