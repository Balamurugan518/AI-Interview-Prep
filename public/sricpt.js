
const questions = [
  "Tell me about yourself.",
  "Why should we hire you?",
  "What are your strengths?",
  "What is your biggest weakness?",
  "Where do you see yourself in five years?",
  "Why do you want to work for our company?",
  "Describe a difficult problem you solved.",
  "How do you handle pressure?",
  "Tell me about a project you are proud of.",
  "Why are you interested in this job role?"
];

let currentQuestion = 0;

function scrollToPractice() {
  document.getElementById("practice").scrollIntoView({
    behavior: "smooth"
  });
}

function showDemo() {
  alert(
    "Demo: Select a job role, start your interview, answer questions and receive feedback."
  );
}

function submitAnswer() {
  const answer = document.getElementById("answer").value.trim();
  const feedback = document.getElementById("feedback");

  if (answer === "") {
    feedback.innerHTML = "⚠️ Please enter your answer.";
    feedback.style.color = "#dc2626";
    return;
  }

  const wordCount = answer.split(/\s+/).length;

  if (wordCount < 10) {
    feedback.innerHTML =
      "Your answer is quite short. Try adding more details and examples.";
    feedback.style.color = "#ea580c";
  } else if (wordCount < 30) {
    feedback.innerHTML =
      "Good answer! You can improve it by giving a specific example.";
    feedback.style.color = "#4f46e5";
  } else {
    feedback.innerHTML =
      "Excellent! Your answer is detailed and well explained.";
    feedback.style.color = "#16a34a";
  }

  setTimeout(nextQuestion, 2000);
}

function nextQuestion() {
  currentQuestion++;

  if (currentQuestion >= questions.length) {
    currentQuestion = 0;
  }

  document.getElementById("question").innerText =
    questions[currentQuestion];

  document.getElementById("answer").value = "";
  document.getElementById("feedback").innerText = "";
}

function startInterview() {
  const role = document.getElementById("role").value;
  const difficulty = document.getElementById("difficulty").value;

  const message = document.getElementById("interviewMessage");

  message.innerHTML =
    "Interview started for <strong>" +
    role +
    "</strong> — Difficulty: <strong>" +
    difficulty +
    "</strong>";

  document.querySelector(".interview-card").scrollIntoView({
    behavior: "smooth"
  });
}
