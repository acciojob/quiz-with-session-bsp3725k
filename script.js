const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");

const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];
// Retrieve user's progress from session storage or initialize an empty object
const userAnswers = JSON.parse(sessionStorage.getItem("progress")) || {};

// Render the quiz questions and choices
function renderQuestions() {
  questionsElement.innerHTML = ""; // Clear existing content

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];

    // Create a container for the question
    const questionContainer = document.createElement("div");
    questionContainer.classList.add("question");

    // Add the question text
    const questionText = document.createElement("p");
    questionText.textContent = question.question;
    questionContainer.appendChild(questionText);

    // Add the multiple-choice options
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];

      // Create a label and input element for each choice
      const choiceLabel = document.createElement("label");
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);

      // Check if the user has previously selected this option
      if (userAnswers[i] === choice) {
        choiceElement.checked = true; // Set the `checked` property
        choiceElement.setAttribute("checked", "true"); // Set the `checked` attribute (Cypress compatibility)
      }

      // Add an event listener to save the user's choice
      choiceElement.addEventListener("change", () => {
        userAnswers[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));

        // Dynamically update the `checked` attribute for all radio buttons in the group
        const radios = document.getElementsByName(`question-${i}`);
        radios.forEach((radio) => radio.removeAttribute("checked"));
        choiceElement.setAttribute("checked", "true");
      });

      // Append the choice input and its label
      choiceLabel.appendChild(choiceElement);
      choiceLabel.appendChild(document.createTextNode(choice));
      questionContainer.appendChild(choiceLabel);
    }

    // Append the question container to the questions element
    questionsElement.appendChild(questionContainer);
  }
}

// Handle the submit action
submitButton.addEventListener("click", () => {
  let score = 0;

  // Calculate the score
  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }

  // Display the score
  scoreElement.textContent = `Your score is ${score} out of ${questions.length}.`;

  // Store the score in local storage
  localStorage.setItem("score", score);
});

// Initial render
renderQuestions();
