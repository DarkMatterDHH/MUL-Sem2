/* QUIZ DATA */

/* Stores all quiz categories and questions */
const quizzes = {
  /* HTML quiz */
  html: [
    {
      /* Question text */
      question: "Hvad bruges HTML til?",

      /* Multiple choice answers */
      answers: [
        "At style hjemmesider",
        "At bygge strukturen",
        "At lave databaser",
      ],

      /* Correct answer index */
      correct: 1,
    },

    {
      question: "Hvad betyder < p > tagget?",

      answers: ["Paragraph", "Picture", "Page"],

      correct: 0,
    },
  ],

  /* CSS quiz */
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

  /* JavaScript quiz */
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

  /* Premiere Pro quiz */
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

  /* Photoshop quiz */
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

  /* Photoshop tools quiz */
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

  /* Illustrator quiz */
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

/* Stores current selected quiz */
let currentQuiz = [];

/* Current question number */
let currentQuestion = 0;

/* Player score */
let score = 0;

/* Stores wrong answers */
let wrongAnswers = [];

/* Stores selected answer index */
let selectedAnswer = null;

/* START QUIZ */

/* Starts selected quiz */
function startQuiz(subject) {
  /* Loads selected quiz category */
  currentQuiz = quizzes[subject];

  /* Shows quiz screen */
  document.querySelector(".quiz-screen").classList.add("active");

  /* Loads first question */
  loadQuestion();
}

/* LOAD QUESTION */

/* Loads current question and answers */
function loadQuestion() {
  /* Resets selected answer */
  selectedAnswer = null;

  /* Current question object */
  let q = currentQuiz[currentQuestion];

  /* Updates question title */
  document.querySelector(".quiz-title").innerHTML =
    `Question ${currentQuestion + 1}`;

  /* Inserts question text */
  document.querySelector(".question").innerHTML = q.question;

  /* Empty answer container */
  let answersHTML = "";

  /* Loops through answers */
  q.answers.forEach((answer, index) => {
    /* Creates answer button */
    answersHTML += `

      <div class="answer"
      onclick="selectAnswer(this,${index})">

        ${answer}

      </div>

    `;
  });

  /* Inserts answers into HTML */
  document.querySelector(".answers").innerHTML = answersHTML;
}

/* SELECT ANSWER */

/* Selects clicked answer */
function selectAnswer(element, index) {
  /* Removes selected class from all answers */
  document.querySelectorAll(".answer").forEach((answer) => {
    answer.classList.remove("selected");
  });

  /* Adds selected class to clicked answer */
  element.classList.add("selected");

  /* Saves selected answer index */
  selectedAnswer = index;
}

/* NEXT QUESTION */

/* Checks answer and moves to next question */
function nextQuestion() {
  /* Stops user if no answer selected */
  if (selectedAnswer === null) {
    alert("Vælg et svar!");

    return;
  }

  /* Current question object */
  let q = currentQuiz[currentQuestion];

  /* Checks if answer is correct */
  if (selectedAnswer === q.correct) {
    /* Adds point */
    score++;
  } else {
    /* Saves wrong answer */
    wrongAnswers.push({
      question: q.question,

      correct: q.answers[q.correct],
    });
  }

  /* Moves to next question */
  currentQuestion++;

  /* Checks if more questions exist */
  if (currentQuestion < currentQuiz.length) {
    /* Loads next question */
    loadQuestion();
  } else {
    /* Shows result screen */
    showResults();
  }
}

/* SHOW RESULTS */

/* Displays final quiz results */
function showResults() {
  /* Hides quiz screen */
  document.querySelector(".quiz-screen").classList.remove("active");

  /* Shows result screen */
  document.querySelector(".result-screen").classList.add("active");

  /* Calculates percentage score */
  let percent = Math.round((score / currentQuiz.length) * 100);

  /* Updates progress circle */
  document.querySelector(".result-circle").style.setProperty(
    "--progress",

    `${percent * 3.6}deg`,
  );

  /* Updates percentage text */
  document.getElementById("score-percent").innerHTML = `${percent}%`;

  /* Updates score text */
  document.getElementById("score-text").innerHTML =
    `Du fik ${score} ud af ${currentQuiz.length} rigtige`;

  /* Gets wrong answers container */
  let wrongContainer = document.getElementById("wrong-answers");

  /* Clears previous content */
  wrongContainer.innerHTML = "";

  /* Loops through wrong answers */
  wrongAnswers.forEach((item) => {
    /* Creates wrong answer card */
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

  /* Launches confetti effect */
  confetti({
    particleCount: 150,

    spread: 100,
  });
}
