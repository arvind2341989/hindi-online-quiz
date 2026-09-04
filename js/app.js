const startScreen = document.getElementById("startScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const restartTopBtn = document.getElementById("restartTopBtn");
const submitBtn = document.getElementById("submitBtn");
const nextBtn = document.getElementById("nextBtn");
const answerForm = document.getElementById("answerForm");

const questionCount = document.getElementById("questionCount");
const progressText = document.getElementById("progressText");
const progressBar = document.getElementById("progressBar");
const liveScore = document.getElementById("liveScore");
const questionTypeBadge = document.getElementById("questionTypeBadge");
const questionNumber = document.getElementById("questionNumber");
const questionText = document.getElementById("questionText");
const selectionHint = document.getElementById("selectionHint");
const optionsContainer = document.getElementById("optionsContainer");

const feedbackBox = document.getElementById("feedbackBox");
const feedbackTitle = document.getElementById("feedbackTitle");
const correctAnswerText = document.getElementById("correctAnswerText");
const explanationText = document.getElementById("explanationText");

const percentageScore = document.getElementById("percentageScore");
const finalScore = document.getElementById("finalScore");
const incorrectCount = document.getElementById("incorrectCount");
const totalQuestions = document.getElementById("totalQuestions");
const resultMessage = document.getElementById("resultMessage");

let currentQuestionIndex = 0;
let score = 0;
let submitted = false;

questionCount.textContent = quizQuestions.length;

startBtn.addEventListener("click", startQuiz);
restartBtn.addEventListener("click", restartQuiz);
restartTopBtn.addEventListener("click", restartQuiz);
answerForm.addEventListener("submit", submitAnswer);
nextBtn.addEventListener("click", goToNextQuestion);

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    submitted = false;

    startScreen.classList.add("hidden");
    resultScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");

    liveScore.textContent = score;
    renderQuestion();
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    submitted = false;

    resultScreen.classList.add("hidden");
    quizScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");

    window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderQuestion() {
    submitted = false;

    const question = quizQuestions[currentQuestionIndex];
    const isMultiple = question.type === "multiple";
    const inputType = isMultiple ? "checkbox" : "radio";

    progressText.textContent =
        `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`;
    questionNumber.textContent = `#${currentQuestionIndex + 1}`;
    progressBar.style.width =
        `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%`;

    questionTypeBadge.textContent =
        isMultiple ? "Multiple Answers" : "One Answer";

    selectionHint.textContent = isMultiple
        ? "Select all answers that apply."
        : "Select one answer.";

    questionText.textContent = question.question;
    optionsContainer.innerHTML = "";

    question.options.forEach((optionText, index) => {
        const label = document.createElement("label");
        label.className = "option";
        label.dataset.index = index;

        const input = document.createElement("input");
        input.type = inputType;
        input.name = "answer";
        input.value = index;

        input.addEventListener("change", () => {
            if (!submitted) {
                updateSelectedStyles();
            }
        });

        const letter = document.createElement("span");
        letter.className = "option-letter";
        letter.textContent = String.fromCharCode(65 + index);

        const text = document.createElement("span");
        text.className = "option-text";
        text.textContent = optionText;

        label.append(input, letter, text);
        optionsContainer.appendChild(label);
    });

    feedbackBox.className = "feedback hidden";
    feedbackTitle.textContent = "";
    correctAnswerText.textContent = "";
    explanationText.textContent = "";

    submitBtn.classList.remove("hidden");
    nextBtn.classList.add("hidden");
}

function updateSelectedStyles() {
    document.querySelectorAll(".option").forEach(option => {
        const input = option.querySelector("input");
        option.classList.toggle("selected", input.checked);
    });
}

function submitAnswer(event) {
    event.preventDefault();

    if (submitted) {
        return;
    }

    const question = quizQuestions[currentQuestionIndex];
    const selectedAnswers = [...document.querySelectorAll('input[name="answer"]:checked')]
        .map(input => Number(input.value))
        .sort((a, b) => a - b);

    if (selectedAnswers.length === 0) {
        alert("Please select an answer before submitting.");
        return;
    }

    submitted = true;

    const expectedAnswers = [...question.correctAnswers].sort((a, b) => a - b);
    const isCorrect = arraysEqual(selectedAnswers, expectedAnswers);

    if (isCorrect) {
        score++;
        liveScore.textContent = score;
    }

    showAnswerFeedback(question, selectedAnswers, isCorrect);

    submitBtn.classList.add("hidden");
    nextBtn.classList.remove("hidden");
    nextBtn.textContent =
        currentQuestionIndex === quizQuestions.length - 1
            ? "View Result"
            : "Next Question";
}

function showAnswerFeedback(question, selectedAnswers, isCorrect) {
    const optionElements = [...document.querySelectorAll(".option")];

    optionElements.forEach((optionElement, index) => {
        const input = optionElement.querySelector("input");
        input.disabled = true;

        optionElement.classList.remove("selected");
        optionElement.classList.add("disabled");

        if (question.correctAnswers.includes(index)) {
            optionElement.classList.add("correct");
        } else if (selectedAnswers.includes(index)) {
            optionElement.classList.add("incorrect");
        }
    });

    feedbackBox.classList.remove("hidden");

    if (isCorrect) {
        feedbackBox.classList.add("correct-feedback");
        feedbackTitle.textContent = "Correct!";
    } else {
        feedbackBox.classList.add("incorrect-feedback");
        feedbackTitle.textContent = "Not quite.";
    }

    const correctLabels = question.correctAnswers.map(
        index => question.options[index]
    );

    correctAnswerText.textContent =
        `Correct answer${correctLabels.length > 1 ? "s" : ""}: ${correctLabels.join(", ")}`;

    explanationText.textContent = question.explanation;
}

function goToNextQuestion() {
    if (currentQuestionIndex < quizQuestions.length - 1) {
        currentQuestionIndex++;
        renderQuestion();
        window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
        showResult();
    }
}

function showResult() {
    quizScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");

    const total = quizQuestions.length;
    const percentage = Math.round((score / total) * 100);

    percentageScore.textContent = `${percentage}%`;
    finalScore.textContent = score;
    incorrectCount.textContent = total - score;
    totalQuestions.textContent = total;

    if (percentage === 100) {
        resultMessage.textContent = "Excellent — you answered every question correctly.";
    } else if (percentage >= 80) {
        resultMessage.textContent = "Very good — you have a strong understanding of the topic.";
    } else if (percentage >= 60) {
        resultMessage.textContent = "Good effort — review the explanations and try again.";
    } else {
        resultMessage.textContent = "Keep practicing — the explanations will help you review the key concepts.";
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
}

function arraysEqual(first, second) {
    return (
        first.length === second.length &&
        first.every((value, index) => value === second[index])
    );
}
