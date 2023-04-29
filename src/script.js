// Hämta frågor och svar från data.js-filen
const questions = [
    {
      question: "Vad är huvudstaden i Sverige?",
      answers: ["Stockholm", "Göteborg", "Malmö"],
      correctAnswer: "Stockholm"
    },
    {
      question: "Vilket djur är inte en däggdjur?",
      answers: ["Hund", "Katt", "Örn"],
      correctAnswer: "Örn"
    }
  ];
  
  // Skapa ett formulär för att visa frågor och svar
  const quizForm = document.createElement("form");
  
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
  
    const questionElement = document.createElement("h3");
    questionElement.innerText = question.question;
    quizForm.appendChild(questionElement);
  
    for (let j = 0; j < question.answers.length; j++) {
      const answer = question.answers[j];
  
      const answerElement = document.createElement("input");
      answerElement.type = "radio";
      answerElement.name = `question-${i}`;
      answerElement.value = answer;
  
      const labelElement = document.createElement("label");
      labelElement.innerText = answer;
      labelElement.appendChild(answerElement);
  
      quizForm.appendChild(labelElement);
    }
  }
  
  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.innerText = "Rätta svar";
  
  quizForm.appendChild(submitButton);
  
  document.body.appendChild(quizForm);