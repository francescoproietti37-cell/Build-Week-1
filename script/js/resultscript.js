function calculateResults() {
  const urlParameters = new URLSearchParams(window.location.search);
  const resultsString = urlParameters.get("results");
  const results = JSON.parse(resultsString);
  insertOnPage(results);
}

function insertOnPage(results) {
  const wrongPercentage = document.getElementById("wrong-percentage");
  const correctPercentage = document.getElementById("correct-percentage");
  const wrongAnswers = document.getElementById("wrong-answers");
  const correctAnswers = document.getElementById("correct-answers");
  const circle = document.querySelector(".progression-circle");

  const percentages = calculatePercentages(results);
  const paragraphs = writeParagraphs(results);
  circle.style.strokeDashoffset = (percentages[1] * 1256) / 100;
  wrongPercentage.innerText = percentages[0] + "%";
  correctPercentage.innerText = percentages[1] + "%";
  wrongAnswers.innerText = paragraphs[0];
  correctAnswers.innerText = paragraphs[1];
  if (percentages[0] > 40) changeParagraphs();
}

function calculatePercentages(results) {
  const percentages = [];
  percentages.push((results.wrongQuestions / results.totalQuestions) * 100);
  percentages.push((results.rightQuestions / results.totalQuestions) * 100);
  return percentages;
}

function writeParagraphs(results) {
  const paragraphs = [];
  paragraphs.push(`${results.wrongQuestions}/${results.totalQuestions} Questions`);
  paragraphs.push(`${results.rightQuestions}/${results.totalQuestions} Questions`);
  return paragraphs;
}

function changeParagraphs() {
  const paragraphs = document.querySelectorAll(".test-result");
  console.log(paragraphs);
  const newParagraphs = [
    "We're sorry.",
    "You did not pass the exam",
    "You can try again another time.",
  ];

  paragraphs[0].innerText = newParagraphs[0];
  paragraphs[1].innerText = newParagraphs[1];
  paragraphs[1].style.color = "#C5488D";
  paragraphs[2].innerText = newParagraphs[2];
}

calculateResults();
