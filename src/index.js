import { questions } from "./data.js";

const appContainer = document.getElementById("app");

appContainer.innerHTML = '<h1>Tipspromenad</h1>';

const quizForm = document.createElement("form");

for (let i = 0; i < questions.length; i++) {
  const question = questions[i];

  const questionElem = document.createElement("div");
  questionElem.innerHTML = `
    <h2>Fråga ${i + 1}</h2>
    <p>${question.question}</p>
    <ol>
      ${question.answers
        .map(
          (answer, answerIndex) =>
            `<li><input type="radio" name="question-${i}" id="question-${i}-${answerIndex}" value="${answer}" /><label for="question-${i}-${answerIndex}">${answer}</label></li>`
        )
        .join("")}
    </ol>
  `;
  quizForm.appendChild(questionElem);
}

const submitButton = document.createElement("button");
submitButton.type = "submit";
submitButton.innerText = "Rätta svar";

quizForm.appendChild(submitButton);

appContainer.appendChild(quizForm);

quizForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    const answerElem = document.querySelector(
      `input[name="question-${i}"]:checked`
    );
    if (answerElem) {
      const answer = answerElem.value;
      if (answer === questions[i].correctAnswer) {
        score++;
      }
    }
  }
  appContainer.innerHTML = `
    <h1>Tipspromenad</h1>
    <h2>Du fick ${score} av ${questions.length} rätt!</h2>
  `;
});
