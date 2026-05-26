/* QUIZ DATA */

const quizzes = {
  html: [
    {
      question: "Hvad bruges HTML til?",
      answers: [
        "At style hjemmesider",
        "At bygge strukturen",
        "At lave databaser",
      ],
      correct: 1,
    },

    {
      question: "Hvad betyder < p > tagget?",
      answers: ["Paragraph", "Picture", "Page"],
      correct: 0,
    },
  ],

  css: [
    {
      question: "Hvad bruges CSS til?",
      answers: [
        "At style hjemmesider",
        "At programmere backend",
        "At gemme data",
      ],
      correct: 0,
    },

    {
      question: "Hvilken property ændrer tekstfarve?",
      answers: ["font-size", "background", "color"],
      correct: 2,
    },
  ],

  js: [
    {
      question: "Hvad gør JavaScript?",
      answers: [
        "Gør hjemmesider interaktive",
        "Laver billeder",
        "Gemmer filer",
      ],
      correct: 0,
    },

    {
      question: "Hvad bruges onclick til?",
      answers: ["At style tekst", "At reagere på klik", "At ændre billeder"],
      correct: 1,
    },
  ],

  premier_pro: [
    {
      question: "Hvad bruges Premier Pro til?",
      answers: ["At redigere video", "At lave grafik", "At skrive kode"],
      correct: 0,
    },
    {
      question: "Hvilken effekt bruger man til greenscreen?",
      answers: ["Ultra Key", "Fade", "Cut"],
      correct: 0,
    },
  ],

  photoshop: [
    {
      question: "Hvad bruges Photoshop til?",
      answers: ["At redigere billeder", "At lave videoer", "At skrive kode"],
      correct: 0,
    },
    {
      question: "Hvilket værktøj bruges til at klippe objekter ud?",
      answers: ["Magic wand", "Brush Tool", "Eraser Tool"],
      correct: 0,
    },
    {
      question: "hvordan laver man tekst med billed som tekst bagground?",
      answers: ["Clipping Mask", "Layer Style", "Sammenlæg billede og tekst"],
      correct: 2,
    },
  ],
  photoshop_værktøjer: [
    {
      question: "Hvad bruges 'Lasso Tool' til?",
      answers: ["At vælge områder", "At tegne", "At male"],
      correct: 0,
    },
    {
      question: "Hvilket værktøj bruges til at retouchere billeder?",
      answers: ["lasso Tool", "Eraser Tool", "Clone Stamp"],
      correct: 2,
    },
    {
      question: "Hvad bruges 'Brush Tool' til?",
      answers: ["At male", "At vælge områder", "At slette"],
      correct: 0,
    },
    {
      question: "Hvad bruges 'Eraser Tool' til?",
      answers: ["At male", "At slette", "At vælge områder"],
      correct: 1,
    },
  ],
  illustrator: [
    {
      question: "Hvad bruges Illustrator til?",
      answers: [
        "At redigere billeder",
        "At lave vektorgrafik",
        "At skrive kode",
      ],
      correct: 1,
    },
    {
      question: "Hvilket værktøj bruges til at tegne lige linjer?",
      answers: ["Pen Tool", "Brush Tool", "Eraser Tool"],
      correct: 0,
    },
    {
      question: "Hvad bruges 'Selection Tool' til?",
      answers: ["At slette", "At tegne", "At vælge objekter"],
      correct: 2,
    },
  ],
};

/* VARIABLES */

let currentQuiz = [];
let currentQuestion = 0;
let score = 0;

let wrongAnswers = [];

let selectedAnswer = null;

/* START QUIZ */

function startQuiz(subject) {
  currentQuiz = quizzes[subject];

  document.querySelector(".quiz-screen").classList.add("active");

  loadQuestion();
}

/* LOAD QUESTION */

function loadQuestion() {
  selectedAnswer = null;

  let q = currentQuiz[currentQuestion];

  document.querySelector(".quiz-title").innerHTML =
    `Question ${currentQuestion + 1}`;

  document.querySelector(".question").innerHTML = q.question;

  let answersHTML = "";

  q.answers.forEach((answer, index) => {
    answersHTML += `
        <div class="answer"
        onclick="selectAnswer(this,${index})">

            ${answer}

        </div>
        `;
  });

  document.querySelector(".answers").innerHTML = answersHTML;
}

/* SELECT ANSWER */

function selectAnswer(element, index) {
  document.querySelectorAll(".answer").forEach((answer) => {
    answer.classList.remove("selected");
  });

  element.classList.add("selected");

  selectedAnswer = index;
}

/* NEXT QUESTION */

function nextQuestion() {
  if (selectedAnswer === null) {
    alert("Vælg et svar!");
    return;
  }

  let q = currentQuiz[currentQuestion];

  if (selectedAnswer === q.correct) {
    score++;
  } else {
    wrongAnswers.push({
      question: q.question,

      correct: q.answers[q.correct],
    });
  }

  currentQuestion++;

  if (currentQuestion < currentQuiz.length) {
    loadQuestion();
  } else {
    showResults();
  }
}

/* SHOW RESULTS */

function showResults() {
  document.querySelector(".quiz-screen").classList.remove("active");

  document.querySelector(".result-screen").classList.add("active");

  let percent = Math.round((score / currentQuiz.length) * 100);

  document
    .querySelector(".result-circle")
    .style.setProperty("--progress", `${percent * 3.6}deg`);

  document.getElementById("score-percent").innerHTML = `${percent}%`;

  document.getElementById("score-text").innerHTML =
    `Du fik ${score} ud af ${currentQuiz.length} rigtige`;

  let wrongContainer = document.getElementById("wrong-answers");

  wrongContainer.innerHTML = "";

  wrongAnswers.forEach((item) => {
    wrongContainer.innerHTML += `
        <div class="wrong-item">

            <h3>Forkert spørgsmål</h3>

            <p>${item.question}</p>

            <p>
                <strong>Korrekt svar:</strong>
                ${item.correct}
            </p>

        </div>
        `;
  });

  confetti({
    particleCount: 150,
    spread: 100,
  });
}
